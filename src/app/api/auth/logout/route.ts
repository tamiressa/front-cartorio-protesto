// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { JWT_COOKIE_NAME } from "@/services/authService";

/**
 * POST /api/auth/logout
 * - Limpa o cookie com o JWT
 */
export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set(JWT_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  return response;
}