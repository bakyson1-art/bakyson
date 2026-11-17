import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const submission = {
      id: `msg-${Date.now()}`,
      name,
      email,
      phone: phone || "",
      company: company || "",
      service: service || "",
      message,
      createdAt: new Date().toISOString(),
      status: "new",
    };

    console.log("Contact form submission:", JSON.stringify(submission, null, 2));

    return NextResponse.json(
      { success: true, message: "Thank you for contacting Bakyson. We'll get back to you within 24 hours.", submission },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 });
  }
}
