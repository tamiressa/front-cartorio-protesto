// src/app/enviarTitulo/page.tsx
"use client";

import ConsultarTituloForm from "@/components/form/ConsultarTituloForm";

export default function ConsultarTituloPage() {
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Consultar Título</h2>
      
      <form>
        <ConsultarTituloForm/> <br />

      </form>
    </div>
  );
}