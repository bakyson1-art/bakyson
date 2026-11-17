import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, description, priority } = body;

    if (!subject || !description) {
      return NextResponse.json(
        { error: "Subject and description are required" },
        { status: 400 }
      );
    }

    const validPriorities = ["Low", "Medium", "High", "Critical"];
    const ticketPriority = validPriorities.includes(priority) ? priority : "Medium";

    const ticket = {
      id: `TKT-${Date.now()}`,
      subject,
      description,
      priority: ticketPriority,
      status: "Open",
      createdAt: new Date().toISOString(),
    };

    console.log("Support ticket submission:", JSON.stringify(ticket, null, 2));

    return NextResponse.json(
      { success: true, message: "Support ticket created successfully. We'll respond within 24 hours.", ticket },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to create support ticket" }, { status: 500 });
  }
}
