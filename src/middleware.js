import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sessionOptions } from '../server/config/session.js';
import { getIronSession } from 'iron-session';

export async function middleware(request) {
  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session?.user) {
    if (request.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/products', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
