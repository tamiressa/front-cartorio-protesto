"use client";

import { useState } from "react";
import ResultadoConsultarTitulo from "@/components/resultados/ResultadoConsultarTitulo";
import ConsultarTituloForm from "@/components/form/ConsultarTituloForm";


export default function ConsultarTituloPage() {
  const [resultado, setResultado] = useState<any>(null);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Consultar Título</h2>

      <section>
        <ConsultarTituloForm onSuccess={setResultado} />
      </section>

      {resultado && (
        <section style={{ marginTop: "30px" }}>
          <ResultadoConsultarTitulo data={resultado} />
          
         
          <details style={{ marginTop: "20px", fontSize: "0.8rem", color: "#999" }}>
            <summary>Ver JSON bruto</summary>
            <pre>{JSON.stringify(resultado, null, 2)}</pre>
          </details>
        </section>
      )}
    </div>
  );
}