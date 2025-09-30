import { NextRequest, NextResponse } from 'next/server';
import { ROUTE_KEYS } from './utils/constants';
import { STORAGE_KEYS } from './utils/constants/api';

export const config = {
  matcher: [
    '/getting-started/:path*',
    '/overview/:path*',
    '/balance/:path*',
    '/payment/:path*',
    '/inflow/:path*',
    '/outflow/:path*',
    '/direct-debit/:path*',
    '/paylinks/:path*',
    '/disputes/:path*',
    '/customers/:path*',
    '/data/:path*',
    '/identity/:path*',
    '/accounts/:path*',
    '/transactions/:path*',
    '/statement/:path*',
    '/c-data/:path*',
    '/c-data/customer',
    '/settings/:path*',
    '/wallet-history/:path*',
    '/business/:path*',
    '/team',
    '/agreement',
  ],
};

export async function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Check for auth token in cookies
  const authToken = request.cookies.get(STORAGE_KEYS.AUTH_TOKEN)?.value;

  if (!authToken) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTE_KEYS.LOGIN;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
