import { Firmware } from "@/app/lib/definitions/firmware";
import { DataTable } from "../../components/table";
import { columns } from "./columns";
import { Interaction } from "@/app/lib/definitions/interaction";

interface Props {
  interactions: (Interaction & { firmware: Firmware })[];
}
export default function InteractionTable(props: Props) {
  const { interactions } = props;
  return (
    <DataTable
      columns={columns}
      data={interactions}
      mobileDisplayValue={(data) => `${data.imei} | ${data.firmware.name}`}
      mobileKeyExtractor={(data) => data.requested_at?.toISOString()}
    />
  );
}
