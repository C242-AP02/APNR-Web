import { NextResponse } from "next/server";

export async function middleware(request) {

  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/static/") || url.pathname === "/background-landing.png") {
    return NextResponse.next();
  }

  const token = request.cookies.get('token');
  
  if (!token && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\/).*)'],
};
