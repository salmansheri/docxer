import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("auth_token");
  const token = cookie?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  try {
    jwt.verify(token, JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/templates/:path*", "/documents/:path*"],
};
