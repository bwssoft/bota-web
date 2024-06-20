"use server";

import { interactionRepo } from "../repository/mongodb/interaction";

export async function listInteractions() {
  return interactionRepo.list();
}

export async function listWithFirmwareByImei(props: { imei?: string }) {
  return interactionRepo.listWithFirmwareByImei(props);
}

