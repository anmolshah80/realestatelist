import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Source -> https://nextjs.org/docs/app/api-reference/functions/cookies
export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();

    // set a secure `httpOnly` cookie valid for 24 hours
    cookieStore.set('admin', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();

  // during logout, clear the cookie
  cookieStore.set('admin', '');

  return NextResponse.json({ success: true });
}
