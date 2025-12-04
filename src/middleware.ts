// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? "access_token";

// Rotas que exigem login
const protectedRoutes = [
  "/enviarTitulo", 
  "/enviarRemessa", 
  "/consultarTitulo", 
  "/consultarArquivo", 
  "/movimento", 
  "confirmacaoRetorno"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get(JWT_COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};