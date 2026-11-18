import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const token = crypto.randomBytes(32).toString("hex");

  return NextResponse.json(
    { csrfToken: token },
    {
      headers: {
        "Set-Cookie": `csrf-token=${token}; Path=/; Max-Age=2592000; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
      },
    }
  );
}
