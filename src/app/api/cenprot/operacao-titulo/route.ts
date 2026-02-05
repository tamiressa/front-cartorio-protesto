import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWT_COOKIE_NAME } from "@/services/authService";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();

    const appToken = cookieStore.get(JWT_COOKIE_NAME)?.value;
    const cenprotToken = cookieStore.get("CENPROT_TOKEN")?.value;

    if (!appToken) {
      return NextResponse.json(
        { message: "Usuário não autenticado no sistema" },
        { status: 401 }
      );
    }

    if (!cenprotToken) {
      return NextResponse.json(
        { message: "Não autenticado no cartório" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const payload = {
      token: cenprotToken,
      titulo: body.titulo,
    };

    const resp = await fetch(
      "http://localhost:8000/ProtestoInterface/operacaoTitulo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    //  AQUI entra o padrão seguro
    const text = await resp.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Resposta não-JSON do backend:", text);
      throw new Error("Backend retornou resposta inválida");
    }

    return NextResponse.json(data, {
      status: resp.status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno ao consultar título" },
      { status: 500 }
    );
  }
}
