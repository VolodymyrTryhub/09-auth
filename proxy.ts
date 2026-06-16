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

  let isAuthenticated = !!accessToken;

  // Якщо accessToken немає, але є refreshToken —
  // пробуємо оновити сесію
  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession();

      if (session) {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // Неавторизований користувач → приватний маршрут
  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Авторизований користувач → публічний маршрут
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
