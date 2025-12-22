export async function POST(req: Request) {
  const body = await req.json();

  const resp = await fetch("http://localhost:8000/ProtestoInterface/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });

  const data = await resp.json();
  return new Response(JSON.stringify(data), { status: resp.status });
}
