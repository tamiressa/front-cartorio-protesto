"use client";
import CedenteForm from "@/components/form/CedenteForm";
import SacadorForm from "@/components/form/SacadorForm";
import DevedorForm from "@/components/form/DevedorForm";
import DividaForm from "@/components/form/DividaForm";


export default function TituloPage() {
  return (
    <section >
      <h2 style={{ marginBottom: '20px' }}>Cadastro de Título</h2>

      <form >

        <CedenteForm /> <br />
        <SacadorForm /> <br />
        <DevedorForm /> <br />
        <DividaForm /> <br />

        <button type="submit" className="btn-entrar" style={{ width: "80%" }}>Enviar</button>

      </form>
    </section>
  );
}
