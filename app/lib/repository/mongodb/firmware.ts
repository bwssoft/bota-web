import { Collection } from "mongodb";
import { Firmware } from "../../definitions/firmware";
import clientPromise from "./connection";

async function connect() {
  const client = await clientPromise;
  const db = client.db("bws-ota");
  return db;
}

async function list(): Promise<Firmware[]> {
  try {
    const db = await connect();

    const firmwares: Collection<Firmware> = db.collection("firmware");
    const data = await firmwares.find().project({ _id: 0 }).toArray();

    return data as unknown as Firmware[]

  } catch (error: any) {
    console.error('[error/firmware-repo] (list)', error.toString())
    throw new Error();
  }
}

export type CreateFirmware = Partial<Firmware>;

async function create(data: CreateFirmware) {
  try {
    const db = await connect();
    return await db.collection('firmware').insertOne(data);
  } catch (error: any) {
    console.log('[error/firmware-repo] (create)', error.toString())
    throw new Error();
  }
}

async function updateOne(data: { query: any, value: any }) {
  try {
    const db = await connect();
    return await db.collection('firmware').updateMany(data.query, { $set: data.value });
  } catch (error: any) {
    console.log('[error/firmware-repo] (update-one)', error)
    throw new Error();
  }
}

async function updateMany(data: { query: any, value: any }) {
  try {
    const db = await connect();
    return await db.collection('firmware').updateMany(data.query, { $set: data.value });
  } catch (error: any) {
    console.log('[error/firmware-repo] (update-many)', error)
    throw new Error();
  }
}

export const firmwareRepo = {
  list,
  create,
  updateOne,
  updateMany
}