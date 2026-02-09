type Props = {
  data: any;
};

export default function ResultadoMovimentoDiario({ data }: Props) {
  if (data.total === "0" || data.total === 0) {
    return <p>Nenhum movimento encontrado para a data informada.</p>;
  }

  return (
    <div>
      {/* Card resumo */}
      <div className="card-form" style={{ marginBottom: "20px" }}>
        <p><strong>Data:</strong> {data.data}</p>
        <p><strong>Total:</strong> {data.total}</p>
      </div>

      {/* Um card por título */}
      {data.titulo.map((t: any, idx: number) => (
        
        <div key={idx} className="card-form" style={{ marginBottom: "16px" }}>
          <p><strong>Devedor:</strong> {t.devedor.nome}</p>
          <p><strong>Documento:</strong> {t.devedor.documento}</p>
          <p><strong>Número:</strong> {t.divida.numero}</p>
          <p><strong>Nosso número:</strong> {t.divida.nossoNumero}</p>
          <p><strong>Vencimento:</strong> {t.divida.vencimento}</p>
          <p><strong>Status:</strong> {t.ocorrencia.status}</p>
          <p><strong>Mensagem:</strong> {t.ocorrencia.mensagem}</p>
        </div>
      ))}
    </div>
  );
}
