import { cookies } from "next/headers";

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? "access_token";

export async function POST(req: Request) {
  const body = await req.json();

  // 🔑 PEGA O JWT DO APP
  const jwt = cookies().get(JWT_COOKIE_NAME)?.value;

  if (!jwt) {
    return new Response(
      JSON.stringify({ detail: "Usuário não autenticado" }),
      { status: 401 }
    );
  }

  // 🔁 REPASSA O JWT PARA O FASTAPI
  const resp = await fetch(
    "http://localhost:8000/ProtestoInterface/autenticar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(body)
    }
  );

  const data = await resp.json();

  if (!resp.ok) {
    return new Response(JSON.stringify(data), { status: resp.status });
  }

  const cred = data.payload.credenciais;

  // 🔐 SALVA TOKEN DO CARTÓRIO
  cookies().set("CENPROT_TOKEN", cred.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return Response.json({ ok: true, validade: cred.validade });
}
