type Props = {
  data: any;
  status?: string;
};

export default function ResultadoMovimentoMensal({ data, status }: Props) {
  if (!data || !data.movimento?.length) {
    return <p>Nenhum movimento encontrado para o mês informado.</p>;
  }

  const todosOsTitulos = data.movimento.flatMap(
    (dia: any) => dia.titulo || []
  );

  const titulosFiltrados = status
    ? todosOsTitulos.filter(
        (t: any) => t.ocorrencia?.status === status
      )
    : todosOsTitulos;

  if (!titulosFiltrados.length) {
    return <p>Nenhum movimento encontrado para o status selecionado.</p>;
  }

  return (
    <div>
      <div className="card-form" style={{ marginBottom: "20px" }}>
        <p><strong>Mês/Ano:</strong> {data.mes}</p>
        <p><strong>Total:</strong> {titulosFiltrados.length}</p>
      </div>

      {titulosFiltrados.map((t: any, idx: number) => (
        <div key={idx} className="card-form" style={{ marginBottom: "16px" }}>
          <p><strong>Devedor:</strong> {t.devedor.nome}</p>
          <p><strong>Documento:</strong> {t.devedor.documento}</p>
          <p><strong>Número:</strong> {t.divida.numero}</p>
          <p><strong>Nosso número:</strong> {t.divida.nossoNumero}</p>
          <p><strong>Vencimento:</strong> {t.divida.vencimento}</p>
          <p><strong>Status:</strong> {t.ocorrencia?.status}</p>
          <p><strong>Mensagem:</strong> {t.ocorrencia?.mensagem}</p>
        </div>
      ))}
    </div>
  );
}