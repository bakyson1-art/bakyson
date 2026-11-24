#!/usr/bin/env node
/**
 * Creates the Bakyson database schema and (optionally) an admin account.
 *
 * Railway's Postgres service has no SQL editor, so run this from the main repo
 * against the *public* connection URL (Postgres -> Connect -> Public Network).
 *
 *   $env:DATABASE_URL="postgresql://postgres:...@....proxy.rlwy.net:PORT/railway"
 *   $env:ADMIN_EMAIL="you@yourcompany.com"
 *   $env:ADMIN_PASSWORD="a-strong-password"
 *   node scripts/db-setup.mjs
 *
 * Safe to re-run: the schema uses CREATE TABLE IF NOT EXISTS, and the admin
 * insert updates the password if the email already exists (acts as a reset).
 * Pass --schema-only to skip the admin account.
 */
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import { Client } from 'pg';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const schemaOnly = process.argv.includes('--schema-only');

function fail(message) {
  console.error(`\nERROR: ${message}\n`);
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  fail(
    [
      'DATABASE_URL is not set.',
      '',
      'PowerShell:',
      '  $env:DATABASE_URL="postgresql://postgres:PASSWORD@HOST.proxy.rlwy.net:PORT/railway"',
      '  node scripts/db-setup.mjs',
      '',
      'Copy the URL from Railway: Postgres service -> Connect -> Public Network.',
    ].join('\n')
  );
}

function describe() {
  try {
    const url = new URL(databaseUrl);
    return `${url.hostname}:${url.port || 5432}${url.pathname}`;
  } catch {
    return '(unparseable DATABASE_URL)';
  }
}

async function openClient(useSsl) {
  const client = new Client({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 15000,
    ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  });
  await client.connect();
  return client;
}

let client;
try {
  client = await openClient(false);
} catch (error) {
  const message = String(error?.message ?? error);
  if (!/ssl|pg_hba|self.signed|certificate/i.test(message)) {
    fail(`Could not connect to ${describe()}\n${message}`);
  }
  try {
    client = await openClient(true);
  } catch (retryError) {
    fail(`Could not connect to ${describe()} (with or without SSL)\n${String(retryError?.message ?? retryError)}`);
  }
}

try {
  console.log(`Connected to ${describe()}`);

  const schema = await readFile(join(root, 'database', 'schema.sql'), 'utf8');
  await client.query(schema);
  console.log('Schema applied (database/schema.sql)');

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!schemaOnly && email && password) {
    if (password.length < 8) {
      fail('ADMIN_PASSWORD must be at least 8 characters.');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const { rows } = await client.query(
      `INSERT INTO users (email, password_hash, role)
       VALUES ($1, $2, 'admin')
       ON CONFLICT (email) DO UPDATE
         SET password_hash = EXCLUDED.password_hash,
             role = 'admin'
       RETURNING id, email`,
      [email, passwordHash]
    );
    console.log(`Admin ready: ${rows[0].email} (id ${rows[0].id})`);
  } else if (!schemaOnly) {
    console.log('No admin created. Set ADMIN_EMAIL and ADMIN_PASSWORD, then rerun to create or reset one.');
  }

  const { rows: [counts] } = await client.query(
    `SELECT (SELECT count(*) FROM users)::int              AS users,
            (SELECT count(*) FROM projects)::int           AS projects,
            (SELECT count(*) FROM tickets)::int            AS tickets,
            (SELECT count(*) FROM submissions)::int        AS submissions,
            (SELECT count(*) FROM job_applications)::int   AS applications,
            (SELECT count(*) FROM newsletter_subscriptions)::int AS subscribers`
  );

  console.log(
    `Tables: ${counts.users} users, ${counts.projects} projects, ${counts.tickets} tickets, ` +
      `${counts.submissions} submissions, ${counts.applications} applications, ${counts.subscribers} subscribers`
  );
} catch (error) {
  fail(String(error?.message ?? error));
} finally {
  await client.end().catch(() => {});
}
