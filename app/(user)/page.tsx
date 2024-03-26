import { listFirmware } from "@/app/lib/actions/firmware";
import HomePageUi from "@/app/ui/page/home";

export default async function Example() {
  const firmwares = await listFirmware();
  return <HomePageUi firmwares={firmwares} />;
}
