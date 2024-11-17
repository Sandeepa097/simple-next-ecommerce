import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sessionOptions } from '../server/config/session.js';
import { getIronSession } from 'iron-session';

export async function middleware(request) {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session?.user) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export const config = {
  matcher: '/admin/:path*',
};
