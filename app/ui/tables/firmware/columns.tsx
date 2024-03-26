import { Firmware } from "@/app/lib/definitions/firmware";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/ui/components/button";
import { Badge } from "../../components/badge";
import Link from "next/link";
import { changeCurrent } from "@/app/lib/actions/firmware";

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
    header: "Atual",
    accessorKey: "current",
    cell: ({ row }) => {
      const firmware = row.original;
      const binded = changeCurrent.bind(null, firmware.uuid);
      return firmware.current ? (
        <Badge label="Atual" theme={"green"} borderless />
      ) : (
        <form action={binded}>
          <Button type="submit" variant={"secondary"} size={"sm"}>
            Tornar Atual
          </Button>
        </form>
      );
    },
  },

  {
    header: "Arquivo",
    accessorKey: "url",
    cell: ({ row }) => {
      const firmware = row.original;
      return (
        <Link href={firmware.url} target="_blank">
          Baixar
        </Link>
      );
    },
  },
];
