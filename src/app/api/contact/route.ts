import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { contactFormSchema } from "@/lib/validators";
import { rateLimit, getClientIP } from "@/lib/rate-limit";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const ip = getClientIP(req);
    const rateLimitResult = await rateLimit(`contact:${ip}`);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();

    const validated = contactFormSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, company, service, message } = validated.data;

    const id = `sub-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await query(
      `INSERT INTO submissions (id, name, email, phone, company, service, message, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING id`,
      [id, name, email, phone || null, company || null, service || null, message, "new"]
    );

    // Send notification email to Bakyson team (non-blocking)
    sendContactNotification({ name, email, phone, company, service, message, submissionId: id });

    // Send confirmation email to submitter (non-blocking)
    sendContactConfirmation({ name, email });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting Bakyson. We'll get back to you within 24 hours.",
        id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 });
  }
}
