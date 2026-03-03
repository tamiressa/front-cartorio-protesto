import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWT_COOKIE_NAME } from "@/services/authService";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();

    const appToken = cookieStore.get(JWT_COOKIE_NAME)?.value;
    const cenprotToken = cookieStore.get("CENPROT_TOKEN")?.value;

    // console.log("🍪 APP_TOKEN:", appToken);
    // console.log("🍪 CENPROT_TOKEN:", cenprotToken);

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
      titulo: body.titulo
    };

    const resp = await fetch(
      `${process.env.FASTAPI_BASE_URL}/ProtestoInterface/enviarTitulo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appToken}`
        },
        body: JSON.stringify(payload)
      }
    );

    const text = await resp.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Resposta não-JSON:", text);
      throw new Error("Backend retornou erro inválido");
    }

    return NextResponse.json(data, { status: resp.status });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro interno ao enviar título" },
      { status: 500 }
    );
  }
}
