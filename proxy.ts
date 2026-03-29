import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from './lib/constants';

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const cookieStore = await cookies();

  const isAdminUser = cookieStore.get(ADMIN_COOKIE_NAME)?.value === 'true';

  if (isAdminUser && path === '/admin/login') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

// Source -> https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
export const config = {
  matcher: ['/admin/login'],
};
