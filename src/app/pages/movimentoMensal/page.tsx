"use client";

import { useState } from "react";
import MovimentoMensalForm from "@/components/form/MovimentoMensalForm";
import ResultadoMovimentoMensal from "@/components/resultados/ResultadoMovimentoMensalForm";

export default function MovimentoDiarioPage() {
  const [resultado, setResultado] = useState<any>(null);
  const [statusSelecionado, setStatusSelecionado] = useState<string>("");

  return (
    <div>
      <h2 >Movimento Mensal</h2>

      <section>
        <MovimentoMensalForm
          onSuccess={setResultado}
          onStatusChange={setStatusSelecionado}
        />
      </section>

      {resultado && (
        <section className="resultado-container">
          <ResultadoMovimentoMensal
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