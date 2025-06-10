
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  const { pathname, origin, search } = request.nextUrl;

  // Already logged in, redirect away from login/register
  if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    return NextResponse.redirect(`${origin}/dashboard/Home`);
  }

  // Not logged in, trying to access protected dashboard routes
  if (pathname.startsWith('/dashboard') && !isAuthenticated) {
    const redirectUrl = `${origin}/login?redirect=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*'],
};
