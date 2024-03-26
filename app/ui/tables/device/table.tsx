import { DataTable } from "../../components/table";
import { columns } from "./columns";

export default function DeviceTable() {
  return (
    <DataTable
      columns={columns}
      data={[
        {
          connected_at: new Date(),
          imei: "419391166964369",
        },
      ]}
      mobileDisplayValue={(data) => data.imei}
      mobileKeyExtractor={(data) => data.connected_at.toISOString()}
    />
  );
}
