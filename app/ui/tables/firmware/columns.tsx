import { Firmware } from "@/app/lib/definitions/firmware";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Firmware>[] = [
  { header: "Nome do arquivo", accessorKey: "name" },
  { header: "Versão", accessorKey: "version" },
  {
    header: "Data de criação",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const firmware = row.original;
      return firmware.created_at.toLocaleString();
    },
  },
  {
    header: "Arquivo",
    accessorKey: "url",
    cell: ({ row }) => {
      const firmware = row.original;
      return (
        <Link href={firmware.file.url} target="_blank">
          Baixar
        </Link>
      );
    },
  },
];
