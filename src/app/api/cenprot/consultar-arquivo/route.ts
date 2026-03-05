import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWT_COOKIE_NAME } from "@/services/authService";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();

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
      arquivo: body.arquivo,
    };

    const resp = await fetch(
      `${process.env.FASTAPI_BASE_URL}/ProtestoInterface/ConsultarArquivo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const text = await resp.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Resposta não-JSON do backend:", text);
      throw new Error("Backend retornou resposta inválida");
    }

    // 🔁 ADAPTER DE CONTRATO
    if (data.status === "business_error") {
      return NextResponse.json(
        {
          arquivo: [],
          message: data.message || "Nenhum arquivo encontrado",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        arquivo: data.payload ?? [],
        message: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno ao consultar arquivo" },
      { status: 500 }
    );
  }
}
