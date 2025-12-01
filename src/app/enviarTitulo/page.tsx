"use client";
import CedenteForm from "@/components/form/CadastroCedenteForm";
import SacadorForm from "@/components/form/CadastroSacadorForm";
import DevedorForm from "@/components/form/CadastroDevedorForm";
import DividaForm from "@/components/form/CadastroDividaForm";


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
