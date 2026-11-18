import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getClientIP(req);
    const rateLimitResult = await rateLimit(`newsletter:${ip}`);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const email = body.email?.toString().trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await query(
      `SELECT id FROM newsletter_subscriptions WHERE email = $1`,
      [email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { success: true, message: "Already subscribed" },
        { status: 200 }
      );
    }

    const id = `sub-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await query(
      `INSERT INTO newsletter_subscriptions (id, email, status, created_at)
       VALUES ($1, $2, 'active', NOW())
       RETURNING id`,
      [id, email]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
        id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Failed to process subscription" }, { status: 500 });
  }
}