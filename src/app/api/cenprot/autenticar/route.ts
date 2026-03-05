import { cookies } from "next/headers";

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? "access_token";

function timestamp() {
  const now = new Date();

  const pad = (n: number, z = 2) => n.toString().padStart(z, "0");

  return (
    now.getFullYear() + "/" +
    pad(now.getMonth() + 1) + "/" +
    pad(now.getDate()) + " " +
    pad(now.getHours()) + ":" +
    pad(now.getMinutes()) + ":" +
    pad(now.getSeconds()) + ":" +
    pad(now.getMilliseconds(), 3)
  );
}

export async function POST(req: Request) {
  const body = await req.json();

  const cookieStore = await cookies();

  const appToken = cookieStore.get(JWT_COOKIE_NAME)?.value;  

  console.log(`[${timestamp()}] JWT dentro do container:`, appToken);

  if (!appToken) {
    return new Response(
      JSON.stringify({ detail: "Usuário não autenticado" }),
      { status: 401 }
    );
  }

  const resp = await fetch(
    `${process.env.FASTAPI_BASE_URL}/ProtestoInterface/autenticar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appToken}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await resp.json();

  // erro HTTP real
  if (!resp.ok) {
    return new Response(JSON.stringify(data), { status: resp.status });
  }

  // ERRO DE NEGÓCIO DA CENPROT (AQUI ESTAVA O BUG)
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

  cookieStore.set("CENPROT_TOKEN", cred.token, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return Response.json({
    ok: true,
    validade: cred.validade,
  });
}
