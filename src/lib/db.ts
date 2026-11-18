import { Pool, type PoolClient } from "pg";
import { createLogger } from "@/lib/logger";

const log = createLogger("db");

if (!process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
  log.warn("DATABASE_URL environment variable is not set. Database operations will fail until configured.");
}

// Railway PostgreSQL connection.
function buildPoolConfig() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return undefined;
  }

  return {
    connectionString,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
}

const poolConfig = buildPoolConfig();

export const pool = poolConfig ? new Pool(poolConfig) : null;

if (pool) {
  pool.on("error", (err) => {
    log.error("Unexpected database pool error", { error: err.message });
  });
}

export async function testConnection(): Promise<boolean> {
  if (!pool) {
    return false;
  }
  try {
    await query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}

export async function query(text: string, params?: unknown[]) {
  if (!pool) {
    throw new Error("Database pool not initialized. DATABASE_URL is not set.");
  }

  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === "development") {
      log.debug("Executed query", { text, duration, rows: result.rowCount });
    }
    return result;
  } catch (error) {
    log.error("Database query error", { text, error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}

export async function getClient(): Promise<PoolClient> {
  if (!pool) {
    throw new Error("Database pool not initialized. DATABASE_URL is not set.");
  }
  return pool.connect();
}

export async function transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  if (!pool) {
    throw new Error("Database pool not initialized. DATABASE_URL is not set.");
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function closePool() {
  if (pool) {
    await pool.end();
  }
}
