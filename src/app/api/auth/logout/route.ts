// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { JWT_COOKIE_NAME } from "@/services/authService";

/**
 * GET /api/auth/logout
 * - Limpa o cookie
 * - Redireciona o usuário para a página /logout
 */
export async function GET(request: NextRequest) {
  // 1. Define para onde redirecionar (ajuste se sua pasta for /pages/logout)
  const logoutPageUrl = new URL("/logout", request.url); 

  // 2. Cria a resposta de redirecionamento (307)
  const response = NextResponse.redirect(logoutPageUrl);

  // 3. Remove o cookie nessa resposta
  response.cookies.set(JWT_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Importante para funcionar local
    sameSite: "lax",
    path: "/",
    maxAge: 0 // Isso faz o cookie expirar imediatamente (deletar)
  });

  return response;
}