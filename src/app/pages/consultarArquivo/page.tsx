"use client";

import { useState } from "react";
import ConsultarArquivo from "@/components/form/ConsultarArquivoForm";

type ArquivoItem = {
  nome: string;
  data: string;
  arquivo: {
    codigoApresentante: string;
    tipoArquivo: string;
    dataArquivo: string;
    nomeArquivo?: string;
    baixado: boolean;
    arquivo?: string;
    resposta: {
      codigo: string;
      mensagem: string;
      status: boolean;
    };
  };
};


export default function ConsultarArquivoPage() {
  const [resultado, setResultado] = useState<ArquivoItem[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleSuccess = (data: any) => {
  console.log("Dados recebidos:", data);

  // erro de negócio tratado pela route
  if (data.message) {
    setMensagem(data.message);
    setResultado([]);
    return;
  }

  setMensagem(null);
  setResultado(data.arquivo);
};



  return (
    <section>
      <h2 style={{ marginBottom: "20px" }}>Consultar Arquivo</h2>

      <ConsultarArquivo onSuccess={handleSuccess} />

      {/* Mensagem de erro de negócio */}
      {mensagem && (
        <div style={{ marginTop: "20px", color: "#b91c1c" }}>
          {mensagem}
        </div>
      )}

      {/* Resultado */}
      {resultado.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Arquivos encontrados</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th align="left">Nome</th>
                <th align="left">Data</th>
                <th align="left">Tipo</th>
                <th align="left">Status</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.nome}</td>
                  <td>{item.data}</td>
                  <td>{item.arquivo.tipoArquivo}</td>
                  <td>{item.arquivo.resposta.mensagem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Debug opcional — remova depois */}
      {/* <pre>{JSON.stringify(resultado, null, 2)}</pre> */}
    </section>
  );
}
