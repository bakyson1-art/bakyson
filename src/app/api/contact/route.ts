import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { contactSchema } from '@/lib/validators';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);
    await query(
      `INSERT INTO submissions (name, email, phone, company, service, message)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [data.name, data.email, data.phone || null, data.company || null, data.service || null, data.message]
    );
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
