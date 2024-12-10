import { NextResponse, NextRequest } from "next/server";

export async function middleware(request) {

  const url = request.nextUrl.clone();
  const token = request.cookies.get("name");
  console.log(token);
  
  if (url.pathname === '/login') {
    if (!url.searchParams.has('redirect')) {
        return NextResponse.redirect(new URL('/', url.origin).toString());
    }
  } else if (!token) {
      const redirectUrl = new URL('/login', url.origin);
      redirectUrl.searchParams.append('redirect', url.pathname);
      return NextResponse.redirect(redirectUrl.toString());
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/image",
    "/list",
    "/list/:id",
    "/dashboard",
    "/login"
  ],
}; 
