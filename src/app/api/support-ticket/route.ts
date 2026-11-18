import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { supportTicketSchema } from "@/lib/validators";
import { rateLimit, getClientIP } from "@/lib/rate-limit";
import { sendSupportTicketNotification, sendSupportTicketConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const ip = getClientIP(req);
    const rateLimitResult = await rateLimit(`support-ticket:${ip}`);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();

    const validated = supportTicketSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { subject, description, priority } = validated.data;

    const id = `TKT-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await query(
      `INSERT INTO tickets (id, user_id, subject, description, priority, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       RETURNING id`,
      [id, null, subject, description, priority, "Open"]
    );

    // Send notification email to support team (non-blocking)
    sendSupportTicketNotification({ ticketId: id, subject, priority, description });

    return NextResponse.json(
      {
        success: true,
        message: "Support ticket created successfully. We'll respond within 24 hours.",
        id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Support ticket error:", error);
    return NextResponse.json({ error: "Failed to create support ticket" }, { status: 500 });
  }
}
