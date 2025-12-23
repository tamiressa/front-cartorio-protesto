// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? "access_token";
const CENPROT_COOKIE_NAME = "CENPROT_TOKEN";

// Rotas que exigem login do app
const appProtectedRoutes = [
  "/enviarTitulo", 
  "/enviarRemessa", 
  "/consultarTitulo", 
  "/consultarArquivo", 
  "/movimento", 
  "/confirmacaoRetorno"
];

// Rotas que exigem autenticação no cartório
const cenprotProtectedRoutes = [
  "/enviarTitulo",
  "/enviarRemessa",
  "/consultarTitulo",
  "/consultarArquivo",
  "/movimento"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requiresAppLogin = appProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const requiresCenprot = cenprotProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const jwt = request.cookies.get(JWT_COOKIE_NAME)?.value;
  const cenprot = request.cookies.get(CENPROT_COOKIE_NAME)?.value;

  // Exige login no app
  if (requiresAppLogin && !jwt) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Exige autenticação no cartório
  if (requiresCenprot && !cenprot) {
    return NextResponse.redirect(
      new URL("/pages/autenticar", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
