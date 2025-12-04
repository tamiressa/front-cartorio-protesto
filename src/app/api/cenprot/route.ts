// src/app/api/cenprot/autenticar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 🔥 Pega o token armazenado no cookie HttpOnly
    const sessionToken = cookies().get("access_token")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { detail: "Token não encontrado. Faça login." },
        { status: 401 }
      );
    }

    // 🔥 Chama o backend Python repassando o cookie corretamente
    const response = await fetch(`${API_URL}/ProtestoInterface/autenticar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // 🔥 Envia COOKIE manualmente (Next não envia por padrão!)
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Erro do Python:", response.status, data);
      return NextResponse.json(
        { detail: data?.detail || "Erro no backend" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Erro interno Next.js:", error);
    return NextResponse.json(
      { detail: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
