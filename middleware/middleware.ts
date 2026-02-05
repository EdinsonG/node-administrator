import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/graph-proxy')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('x-proxy-provider', 'NextJS-Middleware');

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/api/graph-proxy/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ],
};