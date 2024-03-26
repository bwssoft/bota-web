"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { FirebaseGateway } from "../gateway/firebase/firebase.gateway";
import { firmwareRepo } from "../repository/mongodb/firmware";

const firebaseGateway = new FirebaseGateway();

export async function createFirmware(formData: FormData) {
  const { file, name, description, version } = Object.fromEntries(
    formData.entries()
  ) as unknown as { name: string; description: string; version: string; file: File };
  const { url, bucket } = await firebaseGateway.uploadFile(file);

  await firmwareRepo.create({
    uuid: uuidv4(),
    name,
    description,
    version,
    created_at: new Date(),
    url,
    bucket,
    current: false,
  });

  revalidatePath("/");
  redirect("/");
}

export async function listFirmware() {
  return firmwareRepo.list();
}

export async function changeCurrent(uuid: string) {
  await firmwareRepo.updateMany({ query: {}, value: { current: false } });
  await firmwareRepo.updateOne({ query: { uuid }, value: { current: true } });
  revalidatePath("/");
}
