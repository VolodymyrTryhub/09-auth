import { NextRequest, NextResponse } from 'next/server';

import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  const response = NextResponse.next();

  let isAuthenticated = !!accessToken;

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession();

      if (sessionResponse.status === 200) {
        isAuthenticated = true;

        const setCookie = sessionResponse.headers['set-cookie'];

        if (setCookie) {
          response.headers.set(
            'set-cookie',
            Array.isArray(setCookie) ? setCookie.join(', ') : setCookie
          );
        }
      }
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
