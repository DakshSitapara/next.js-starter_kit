import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  const { pathname, origin, search } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/(auth)');
  const isNoAuthRoute = pathname.startsWith('/(no_auth)');
  const isHybridRoute = pathname.startsWith('/(hybrid)'); // For completeness

  // ✅ Redirect authenticated users away from login/register/forgot/reset pages
  if (isNoAuthRoute && isAuthenticated) {
    return NextResponse.redirect(`${origin}/dashboard/Home`);
  }

  // ✅ Redirect unauthenticated users away from protected dashboard routes
  if (isAuthRoute && !isAuthenticated) {
    const redirectUrl = `${origin}/login?redirect=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(redirectUrl);
  }

  // Hybrid routes are accessible by anyone — no redirect
  return NextResponse.next();
}

// 👇 Apply middleware only to grouped routes
export const config = {
  matcher: [
    '/(auth)/:path*',
    '/(no_auth)/:path*',
  ],
};
