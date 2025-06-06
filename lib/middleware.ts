// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedRoutesForUnauthenticated = ['/dashboard/Home', '/dashboard/about-us', '/login', '/register'];

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('auth-token'); // Replace with your auth check
  const { pathname } = request.nextUrl;

  if (!isAuthenticated && !allowedRoutesForUnauthenticated.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard/Home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};