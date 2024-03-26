import { Device } from "@/app/lib/definitions/device";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Device>[] = [
  { header: "Imei", accessorKey: "imei" },
  {
    header: "Data de conexão", accessorKey: "connected_at", cell: ({ row }) => {
      const device = row.original
      return device.connected_at.toLocaleString()
    }
  },
];
