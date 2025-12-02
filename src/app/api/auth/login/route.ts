// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { loginFastAPI, JWT_COOKIE_NAME, JWT_COOKIE_MAX_AGE } from "@/services/authService";

/**
 * POST /api/auth/login
 * Body: { username, password }
 * - Autentica no FastAPI
 * - Armazena o JWT em cookie HttpOnly
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return NextResponse.json(
        { detail: "Credenciais obrigatórias." },
        { status: 400 }
      );
    }

    const authResponse = await loginFastAPI({ username, password });

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    response.cookies.set(JWT_COOKIE_NAME, authResponse.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',      // deixe true em produção (https)
      sameSite: "lax",
      path: "/",
      maxAge: JWT_COOKIE_MAX_AGE
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { detail: "Usuário ou senha inválidos." },
      { status: 401 }
    );
  }
}