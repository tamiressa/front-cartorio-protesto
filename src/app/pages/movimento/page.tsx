"use client";

import { useState } from "react";
import MovimentoDiarioForm from "@/components/form/MovimentoDiarioForm";
import ResultadoMovimentoDiario from "@/components/resultados/ResultadoMovimentoDiarioForm";

export default function MovimentoDiarioPage() {
  const [resultado, setResultado] = useState<any>(null);
  const [statusSelecionado, setStatusSelecionado] = useState<string>("");

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Movimento Diário</h2>

      <section>
        <MovimentoDiarioForm
          onSuccess={setResultado}
          onStatusChange={setStatusSelecionado}
        />
      </section>

      {resultado && (
        <section style={{ marginTop: "30px" }}>
          <ResultadoMovimentoDiario
            data={resultado}
            status={statusSelecionado}
          />

          <details
            style={{
              marginTop: "20px",
              fontSize: "0.8rem",
              color: "#999",
            }}
          >
            <summary>Ver JSON bruto</summary>
            <pre>{JSON.stringify(resultado, null, 2)}</pre>
          </details>
        </section>
      )}
    </div>
  );
}