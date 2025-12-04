"use client";
import EnviarTituloForm from "@/components/form/EnviarTituloForm";

export default function TituloPage() {
  return (
    <section >
      <h2 style={{ marginBottom: '20px' }}>Cadastro de Título</h2>

      <form >

        <EnviarTituloForm /> <br />

      </form>
    </section>
  );
}
