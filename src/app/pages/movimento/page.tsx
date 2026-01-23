// src/app/enviarTitulo/page.tsx
import MovimentoDiario from "@/components/form/MovimentoDiarioForm";

export default function MovimentoDiarioPage() {
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Movimento Diário</h2>

      <MovimentoDiario/> <br/>
    </div>
  );
}