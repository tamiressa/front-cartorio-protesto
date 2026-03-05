import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

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

  const titulosTabela = titulosFiltrados.map((t: any) => ({
    devedor: t.devedor.nome,
    documento: t.devedor.documento,
    numero: t.divida.numero,
    nossoNumero: t.divida.nossoNumero,
    vencimento: t.divida.vencimento,
    status: t.ocorrencia?.status,
    mensagem: t.ocorrencia?.mensagem,
  }));

  return (
    <div >

      <div className="card-form" style={{ marginBottom: "20px" }}>
        <p><strong>Mês/Ano:</strong> {data.mes}</p>
        <p><strong>Total:</strong> {titulosTabela.length}</p>
      </div>

      <DataTable
        columns={columns}
        data={titulosTabela}
      />

    </div>
  );
}