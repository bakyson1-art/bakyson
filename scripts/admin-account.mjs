#!/usr/bin/env node
/**
 * Inspect or repair the account used to sign in to the admin dashboard.
 *
 * The admin app, the public site and this script all talk to the same
 * PostgreSQL database, so a working DATABASE_URL here is the same one the
 * deployed services need.
 *
 *   # show every account (no password hashes are printed)
 *   node scripts/admin-account.mjs
 *
 *   # check a single account
 *   node scripts/admin-account.mjs --check bakyson1@gmail.com
 *
 *   # create the account, or reset its password and make it an admin
 *   $env:ADMIN_PASSWORD="a-strong-password"
 *   node scripts/admin-account.mjs --reset bakyson1@gmail.com
 *
 * DATABASE_URL is read from the environment first, then from .env.local or
 * .env in the project root, so the URL never has to be pasted on a command
 * line (and therefore never lands in shell history).
 */
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import { Client } from 'pg';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function fail(message) {
  console.error(`\nERROR: ${message}\n`);
  process.exit(1);
}

async function loadEnvFile() {
  let source = null;
  for (const name of ['.env.local', '.env']) {
    try {
      const text = await readFile(join(root, name), 'utf8');
      for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
        if (!match) continue;
        const [, key, raw] = match;
        if (process.env[key] !== undefined) continue;
        process.env[key] = raw.replace(/^(['"])(.*)\1$/, '$2');
        if (key === 'DATABASE_URL' && source === null) source = name;
      }
    } catch {
      // try the next file
    }
  }
  return source;
}

const envFile = await loadEnvFile();
const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  fail(
    [
      'DATABASE_URL is not set.',
      '',
      'Create a .env.local file in the project root with one line:',
      '  DATABASE_URL=postgresql://postgres:PASSWORD@HOST.proxy.rlwy.net:PORT/railway',
      '',
      'Copy it from Railway: Postgres service -> Connect -> Public Network.',
      '(.env.local is gitignored and never committed.)',
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

function needsSsl(url) {
  if (/[?&]sslmode=require/i.test(url)) return true;
  try {
    return /\.rlwy\.net$/i.test(new URL(url).hostname);
  } catch {
    return false;
  }
}

async function connect() {
  const client = new Client({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 15000,
    ...(needsSsl(databaseUrl) ? { ssl: { rejectUnauthorized: false } } : {}),
  });
  try {
    await client.connect();
    return client;
  } catch (error) {
    const message = String(error?.message ?? error);
    if (!/ssl|pg_hba|self.signed|certificate/i.test(message)) {
      fail(`Could not connect to ${describe()}\n${message}`);
    }
    const retry = new Client({
      connectionString: databaseUrl,
      connectionTimeoutMillis: 15000,
      ssl: { rejectUnauthorized: false },
    });
    try {
      await retry.connect();
      return retry;
    } catch (retryError) {
      fail(`Could not connect to ${describe()} (with or without SSL)\n${String(retryError?.message ?? retryError)}`);
    }
  }
}

function args() {
  const argv = process.argv.slice(2);
  const flag = (name) => argv.indexOf(name);
  const valueAfter = (name) => {
    const i = flag(name);
    return i === -1 ? null : argv[i + 1] ?? '';
  };
  return { check: valueAfter('--check'), reset: valueAfter('--reset') };
}

const client = await connect();

try {
  console.log(`Connected to ${describe()}${envFile ? ` (DATABASE_URL from ${envFile})` : ''}`);

  const { rows } = await client.query(
    `SELECT id, email, role, password_hash, created_at FROM users ORDER BY id`
  );

  console.log(`\nusers table: ${rows.length} row(s)`);
  for (const row of rows) {
    const hash = String(row.password_hash ?? '');
    const scheme = hash.split('$')[1] ?? '(unknown)';
    console.log(
      `  #${row.id}  ${row.email}  role=${row.role}  hash=${scheme}/${hash.length}  created=${row.created_at?.toISOString?.() ?? row.created_at}`
    );
  }

  const opts = args();
  const email = (opts.check ?? opts.reset)?.trim().toLowerCase();

  if (email) {
    const found = rows.find((row) => String(row.email).toLowerCase() === email);
    console.log(`\nlookup ${email}: ${found ? `exists (role=${found.role})` : 'NOT FOUND'}`);
  }

  if (opts.reset) {
    if (!email) throw new Error('--reset needs an email address.');
    const password = process.env.ADMIN_PASSWORD;
    if (!password || password.length < 12) {
      throw new Error('Set ADMIN_PASSWORD (at least 12 characters) before using --reset.');
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const { rows: saved } = await client.query(
      `INSERT INTO users (email, password_hash, role)
       VALUES ($1, $2, 'admin')
       ON CONFLICT (email) DO UPDATE
         SET password_hash = EXCLUDED.password_hash,
             role = 'admin'
       RETURNING id, email, role`,
      [email, passwordHash]
    );
    console.log(`\nreset ${saved[0].email}: password updated, role=${saved[0].role} (id ${saved[0].id})`);
  }
} catch (error) {
  console.error(`\nERROR: ${String(error?.message ?? error)}\n`);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
