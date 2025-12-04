"use client";
import { useState } from "react";

export default function EnviaRemessaForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      cod_apresentante: formData.get("remessa_codigo"),
      nome_arquivo: formData.get("remessa_nome"),
      arquivo_base64: formData.get("remessa_base64"),
    };

    const response = await fetch("/api/enviaRemessa", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setResult(data);

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="card-form">
        <h3 className="section-title">Remessa</h3>
        <div className="form-grid">
          
          <div className="form-group third-width">
            <label>código apresentante<br />
              <input className="input-field" name="remessa_codigo" type="text" />
            </label>
          </div>

          <div className="form-group third-width">
            <label>nome arquivo<br />
              <input className="input-field" name="remessa_nome" type="text" />
            </label>
          </div>

          <div className="form-group third-width">
            <label>arquivo base64<br />
              <input className="input-field" name="remessa_base64" type="text" />
            </label>
          </div>

          <button className="btn-entrar" type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>

        </div>
      </fieldset>

      {result && (
        <pre style={{ marginTop: "20px", background: "#111", color: "#0f0", padding: "10px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}
