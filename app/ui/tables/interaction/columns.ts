import { Firmware } from "@/app/lib/definitions/firmware";
import { Interaction } from "@/app/lib/definitions/interaction";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Interaction & { firmware: Firmware }>[] = [
  { header: "Imei", accessorKey: "imei" },
  {
    header: "Data da requisição", accessorKey: "requested_at", cell: ({ row }) => {
      const interaction = row.original
      console.log('interaction', interaction)
      return interaction.requested_at.toLocaleString()
    }
  },
  {
    header: "Firmware", accessorKey: "firmware", cell: ({ row }) => {
      const interaction = row.original
      return interaction.firmware.name
    }
  },
];
