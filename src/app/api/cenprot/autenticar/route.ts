import { cookies } from "next/headers";

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? "access_token";

export async function POST(req: Request) {
  const body = await req.json();

  const jwt = cookies().get(JWT_COOKIE_NAME)?.value;

  if (!jwt) {
    return new Response(
      JSON.stringify({ detail: "Usuário não autenticado" }),
      { status: 401 }
    );
  }

  const resp = await fetch(
    "http://localhost:8000/ProtestoInterface/autenticar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await resp.json();

  // ❌ erro HTTP real
  if (!resp.ok) {
    return new Response(JSON.stringify(data), { status: resp.status });
  }

  // 🚨 ERRO DE NEGÓCIO DA CENPROT (AQUI ESTAVA O BUG)
  const resposta = data?.payload?.credenciais?.resposta;

  if (resposta?.status === false) {
    return new Response(
      JSON.stringify({
        code: resposta.codigo,
        message: resposta.mensagem,
      }),
      { status: 400 } // ou 200, se quiser manter padrão da CENPROT
    );
  }

  const cred = data.payload.credenciais;

  cookies().set("CENPROT_TOKEN", cred.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return Response.json({
    ok: true,
    validade: cred.validade,
  });
}
