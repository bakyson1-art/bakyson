/**
 * Bakyson Database Migration Script
 * 
 * Reads database/schema.sql and executes it against the configured PostgreSQL database.
 * 
 * Usage:
 *   DATABASE_URL="postgresql://..." npx tsx scripts/migrate.ts
 * 
 * Or via npm:
 *   npm run migrate
 */

import { readFileSync } from "fs";
import { join } from "path";
import { query } from "@/lib/db";

async function migrate() {
  console.log("🚀 Starting Bakyson database migration...");

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not set.");
    console.error("   Copy .env.example to .env and configure your Railway PostgreSQL connection string.");
    process.exit(1);
  }

  try {
    // Test connection first
    const connected = await (async () => {
      try {
        await query("SELECT 1");
        return true;
      } catch {
        return false;
      }
    })();

    if (!connected) {
      console.error("❌ Cannot connect to database. Check your DATABASE_URL and network.");
      process.exit(1);
    }

    console.log("✅ Database connection established.");

    // Read and execute schema
    const schemaPath = join(process.cwd(), "database", "schema.sql");
    const schemaSql = readFileSync(schemaPath, "utf-8");

    // Split by semicolons and execute each statement
    const statements = schemaSql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    console.log(`📋 Found ${statements.length} SQL statements to execute.`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        await query(statement);
        const preview = statement.substring(0, 60).replace(/\s+/g, " ");
        console.log(`   [${i + 1}/${statements.length}] ✅ ${preview}...`);
      } catch (error) {
        const preview = statement.substring(0, 60).replace(/\s+/g, " ");
        console.error(`   [${i + 1}/${statements.length}] ❌ ${preview}...`);
        console.error(`      Error: ${error instanceof Error ? error.message : String(error)}`);
        // Continue with other statements rather than failing entirely
      }
    }

    console.log("\n✅ Migration complete!");
    console.log("\nNext steps:");
    console.log("   1. Seed demo data:   DATABASE_URL='...' npx tsx scripts/seed.ts");
    console.log("   2. Start dev server: npm run dev");
    console.log("   3. Visit: http://localhost:3000");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();
