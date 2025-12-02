"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorMsg(data?.detail ?? "Falha na autenticação.");
        setLoading(false);
        return;
      }

      // Sucesso -> redireciona para rota protegida padrão
      router.push("/enviarTitulo");
    } catch (error) {
      console.error(error);
      setErrorMsg("Erro de comunicação com o servidor.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Usuário</label>
        <input
          value={username}
          className="input-field"
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Senha</label>
        <input
          type="password"
          value={password}
          placeholder="******"
          className="input-field"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

    <button
  type="submit"
  disabled={loading}
  className="btn-entrar"
  style={{ width: "100%" }}
  >
  {loading ? (<> Autenticando... </>) : ( "Entrar")}
</button>
    </form>
  );
}