import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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

    const submission = {
      id: `app-${Date.now()}`,
      name,
      email,
      phone: phone || "",
      coverLetter,
      resumeFileName: resume.name,
      resumeSize: resume.size,
      createdAt: new Date().toISOString(),
      status: "new",
    };

    console.log("Careers application submission:", JSON.stringify(submission, null, 2));

    return NextResponse.json(
      { success: true, message: "Thank you for applying to Bakyson. We'll review your application and get back to you soon.", submission },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 });
  }
}
