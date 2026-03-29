import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ADMIN_COOKIE_NAME } from '@/lib/constants';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Source -> https://nextjs.org/docs/app/api-reference/functions/cookies
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 },
    );
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();

  // set a secure `httpOnly` cookie valid for 24 hours
  cookieStore.set(ADMIN_COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();

  // during logout, clear the cookie
  cookieStore.set(ADMIN_COOKIE_NAME, '');

  return NextResponse.json({ success: true });
}
