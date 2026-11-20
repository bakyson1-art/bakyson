import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validators';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email } = newsletterSchema.parse(await req.json());
    await query(
      `INSERT INTO newsletter_subscriptions (email, status)
       VALUES ($1, 'active')
       ON CONFLICT (email) DO UPDATE SET status = 'active'`,
      [email]
    );
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 400 });
  }
}
