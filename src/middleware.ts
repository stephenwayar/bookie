import { NextResponse, NextRequest } from 'next/server'
import { UserKey } from './redux/types/user.type';

export function middleware(request: NextRequest) {
  let isLoggedIn = false;

  const cookieUser = request.cookies.get(UserKey.BOOKIED_USER);

  // List of authentication pages
  const authPages = [ '/login', '/register'];

  // Check if the user exists
  if (cookieUser) {
    isLoggedIn = true;
  }

  // Redirect unauthorized users trying to access protected pages
  if (request.nextUrl.pathname.startsWith('/account') && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url));
  }

  // Redirect logged-in users trying to access authentication pages
  if (authPages.includes(request.nextUrl.pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to proceed to the next middleware
  return NextResponse.next();
}