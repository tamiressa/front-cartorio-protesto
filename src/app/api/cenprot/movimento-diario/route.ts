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
      movimento: body.movimento
    };


    const resp = await fetch(
      `http://localhost:8000/ProtestoInterface/movimentoDiario`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appToken}`,
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await resp.json();

    if (!resp.ok) {
      return NextResponse.json(data, { status: resp.status });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno ao consultar movimento diário" },
      { status: 500 }
    );
  }
}
