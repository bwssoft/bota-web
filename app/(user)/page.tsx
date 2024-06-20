import { listFirmware } from "@/app/lib/actions/firmware";
import HomePageUi from "@/app/ui/page/home";
import { listWithFirmwareByImei } from "../lib/actions/interaction";

export default async function Example(props: {
  searchParams: { imei?: string };
}) {
  const { searchParams } = props;
  const firmwares = await listFirmware();
  const interactions = await listWithFirmwareByImei({
    imei: searchParams?.imei,
  });
  return <HomePageUi firmwares={firmwares} interactions={interactions} />;
}
