import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rateLimit, getClientIP } from "@/lib/rate-limit";
import { sendCareersApplicationNotification, sendCareersConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const ip = getClientIP(req);
    const rateLimitResult = await rateLimit(`careers:${ip}`);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resume = formData.get("resume") as File;

    if (!name || !email || !coverLetter || !resume) {
      return NextResponse.json(
        { error: "Name, email, cover letter, and resume are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json({ error: "Resume must be a PDF file" }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024;
    if (resume.size > maxSize) {
      return NextResponse.json({ error: "Resume must be under 5MB" }, { status: 400 });
    }

    const id = `app-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    await query(
      `INSERT INTO job_applications (id, name, email, phone, cover_letter, resume_file_name, resume_file_url, resume_file_size, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       RETURNING id`,
      [id, name, email, phone || null, coverLetter, resume.name, null, resume.size, "new"]
    );

    // Send notification email to HR (non-blocking)
    sendCareersApplicationNotification({ name, email, phone, coverLetter, resumeFileName: resume.name, applicationId: id });

    // Send confirmation email to applicant (non-blocking)
    sendCareersConfirmation({ name, email });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for applying to Bakyson. We'll review your application and get back to you soon.",
        id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Careers application error:", error);
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 });
  }
}
