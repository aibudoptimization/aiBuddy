import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/Getstarted") {
    const url = request.nextUrl.clone();
    url.pathname = "/getstarted";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
