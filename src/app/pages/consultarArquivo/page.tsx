"use client"
import ConsultarArquivo from "@/components/form/ConsultarArquivoForm";

export default function ConsultarArquivoPage() {

  const handleSuccess = (data: any) => {
    console.log("Dados recebidos:", data);
  }

  return (
    <section>
      
      <h2 style={{ marginBottom: '20px' }}>Consultar Arquivo</h2>
      <ConsultarArquivo onSuccess={handleSuccess}/>

      
    </section>
    );
  }
