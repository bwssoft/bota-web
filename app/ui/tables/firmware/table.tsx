import Link from "next/link";
import { DataTable } from "../../components/table";
import { columns } from "./columns";
import { Firmware } from "@/app/lib/definitions/firmware";

export default async function FirmwareTable(params: { data: Firmware[] }) {
  const { data } = params;
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Firmwares
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos os firmware na sua conta incluindo o nome, versão e
            data de criação.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link href={"/firmware/create"}>
            <button
              type="button"
              className="block rounded-md bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Add firmware
            </button>
          </Link>
        </div>
      </div>
      <DataTable
        className="mt-8"
        columns={columns}
        data={data}
        mobileDisplayValue={(data) => `${data.name} ${data.version}`}
        mobileKeyExtractor={(data) => data.created_at.toISOString()}
      />
    </>
  );
}
