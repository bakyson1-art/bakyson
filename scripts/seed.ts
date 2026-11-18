/**
 * Bakyson Database Seed Script
 * Run: DATABASE_URL="..." npx tsx scripts/seed.ts
 * or: DATABASE_URL="..." node scripts/seed.js (after compiling)
 */

import { pool, query } from "@/lib/db";

async function seed() {
  console.log("🌱 Starting Bakyson database seed...");

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Check if data already exists
    const existingUsers = await client.query("SELECT COUNT(*) FROM users");
    const userCount = parseInt(existingUsers.rows[0].count, 10);

    if (userCount > 0) {
      console.log("⚠️  Database already seeded. Skipping.");
      await client.query("ROLLBACK");
      return;
    }

    // Hash demo password
    const bcrypt = await import("bcryptjs");
    const demoPasswordHash = await bcrypt.hash("demo123", 12);

    // Insert demo user
    const userResult = await client.query(
      `INSERT INTO users (id, email, password_hash, role, company, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id, email`,
      ["demo-user-1", "demo@bakyson.com", demoPasswordHash, "client", "Demo Company Ltd"]
    );
    const userId = userResult.rows[0].id;
    console.log(`✅ Created demo user: demo@bakyson.com (id: ${userId})`);

    // Insert demo projects
    const projects = [
      {
        name: "JW Marriott Nairobi - IPTV Deployment",
        status: "In Progress",
        progress: 65,
        location: "Nairobi, Kenya",
        start_date: "2024-01-15",
        end_date: "2024-03-30",
        manager: "Sarah Njeri",
        description: "Interactive IPTV and digital signage deployment across 200+ guest rooms.",
      },
      {
        name: "Aga Khan Hospital Kisumu - Nurse Call",
        status: "Completed",
        progress: 100,
        location: "Kisumu, Kenya",
        start_date: "2024-02-01",
        end_date: "2024-04-15",
        manager: "James Otieno",
        description: "Wireless nurse call system with biometric access control for ICU and pharmacy.",
      },
      {
        name: "African Reagent Accra - Network Upgrade",
        status: "Planning",
        progress: 20,
        location: "Accra, Ghana",
        start_date: "2024-05-01",
        end_date: "2024-06-15",
        manager: "Kwame Asante",
        description: "Enterprise structured cabling with HSIA and redundant network core.",
      },
    ];

    for (const p of projects) {
      await client.query(
        `INSERT INTO projects (id, user_id, name, status, progress, location, start_date, end_date, manager, description, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())`,
        [
          `prj-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          userId,
          p.name,
          p.status,
          p.progress,
          p.location,
          p.start_date,
          p.end_date,
          p.manager,
          p.description,
        ]
      );
    }
    console.log(`✅ Created ${projects.length} demo projects`);

    // Insert demo support tickets
    const tickets = [
      {
        subject: "IPTV signal issue in Room 402",
        description: "Guest in Room 402 reports no IPTV signal. Need technician to inspect.",
        priority: "High",
        status: "Open",
      },
      {
        subject: "Access control card not working",
        description: "Staff access card not granting entry to server room. Card needs reprogramming.",
        priority: "Medium",
        status: "In Progress",
      },
    ];

    for (const t of tickets) {
      await client.query(
        `INSERT INTO tickets (id, user_id, subject, description, priority, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
        [
          `tkt-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          userId,
          t.subject,
          t.description,
          t.priority,
          t.status,
        ]
      );
    }
    console.log(`✅ Created ${tickets.length} demo support tickets`);

    // Insert demo chat messages
    const chatMessages = [
      { sender: "agent", text: "Hello! How can I help you with Bakyson's ICT solutions today?" },
      { sender: "user", text: "I need information about your IPTV solutions for hotels." },
      { sender: "agent", text: "Our Interactive IPTV systems support 200+ guest rooms with localized content and PMS integration." },
    ];

    for (const m of chatMessages) {
      await client.query(
        `INSERT INTO chat_messages (id, user_id, sender, text, created_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [`msg-${Date.now()}-${Math.random().toString(36).slice(2)}`, userId, m.sender, m.text]
      );
    }
    console.log(`✅ Created ${chatMessages.length} demo chat messages`);

    // Insert demo contact submissions
    const submissions = [
      {
        name: "John Smith",
        email: "john.smith@hotelgroup.com",
        phone: "+254 700 123 456",
        company: "Hotel Group Africa",
        service: "Infotainment & IPTV",
        message: "We need IPTV and digital signage for our new hotel property in Nairobi. Please contact us for a quote.",
      },
    ];

    for (const s of submissions) {
      await client.query(
        `INSERT INTO submissions (id, name, email, phone, company, service, message, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
        [
          `sub-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          s.name,
          s.email,
          s.phone,
          s.company,
          s.service,
          s.message,
          "new",
        ]
      );
    }
    console.log(`✅ Created ${submissions.length} demo contact submissions`);

    await client.query("COMMIT");
    console.log("✅ Database seed completed successfully!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Seed failed:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((error) => {
  console.error("❌ Seed script error:", error);
  process.exit(1);
});
