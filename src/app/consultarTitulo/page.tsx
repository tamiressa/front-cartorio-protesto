// src/app/enviarTitulo/page.tsx
"use client";

import ConsultarDevedorForm from "@/components/form/ConsultarDevedorForm";
import ConsultarDividaForm from "@/components/form/ConsultarDividaForm";
import ConsultarCartorioForm from "@/components/form/ConsultarCartorioForm";


export default function ConsultarTituloPage() {
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Consultar Título</h2>
      
      <form>
        <ConsultarDevedorForm/> <br />
        <ConsultarDividaForm/> <br />
        <ConsultarCartorioForm/> <br />

      </form>

      <button
        className="btn-entrar" type="submit" style={{ width: "80%" }}
        > Consultar 
      </button>

    </div>
  );
}