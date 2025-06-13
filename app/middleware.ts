// middleware.ts at project root
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  const { pathname, origin, search } = request.nextUrl;

  const referer = request.headers.get('referer'); 
  if (
    isAuthenticated &&
    ['/login', '/register', '/forgot-password', '/reset-password'].includes(pathname)
  ) {
    const fallback = `${origin}/dashboard/Home`;
    return NextResponse.redirect(referer || fallback);
  }

  if (pathname.startsWith('/dashboard') && !isAuthenticated) {
    const redirectUrl = `${origin}/login?redirect=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/dashboard/:path*',
  ],
};
