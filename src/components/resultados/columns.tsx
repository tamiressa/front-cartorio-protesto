import { ColumnDef } from "@tanstack/react-table";

export type Titulo = {
  devedor: string;
  documento: string;
  numero: string;
  nossoNumero: string;
  vencimento: string;
  status: string;
  mensagem: string;
};

export const columns: ColumnDef<Titulo>[] = [
  {
    accessorKey: "devedor",
    header: "Devedor",
  },
  {
    accessorKey: "documento",
    header: "Documento",
  },
  {
    accessorKey: "numero",
    header: "Número",
  },
  {
    accessorKey: "nossoNumero",
    header: "Nosso número",
  },
  {
    accessorKey: "vencimento",
    header: "Vencimento",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "mensagem",
    header: "Mensagem",
  },
];