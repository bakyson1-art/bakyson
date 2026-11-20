import { NextResponse } from 'next/server';
import { careersSchema } from '@/lib/validators';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = careersSchema.parse({
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      position: String(formData.get('position') || ''),
      cover_letter: String(formData.get('cover_letter') || ''),
    });
    await query(
      `INSERT INTO job_applications (name, email, phone, position, cover_letter)
       VALUES ($1, $2, $3, $4, $5)`,
      [data.name, data.email, data.phone || null, data.position, data.cover_letter || null]
    );
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 400 });
  }
}
