import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { query } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userRes = await query('SELECT id FROM users WHERE email = $1', [session.user.email]);
  if (!userRes.rows[0]) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const res = await query('SELECT id,subject,status,created_at FROM tickets WHERE user_id = $1 ORDER BY created_at DESC', [userRes.rows[0].id]);
  return NextResponse.json({ tickets: res.rows });
}
