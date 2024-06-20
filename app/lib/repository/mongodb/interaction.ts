import { Collection } from "mongodb";
import clientPromise from "./connection";
import { Interaction } from "../../definitions/interaction";
import { Firmware } from "../../definitions/firmware";

async function connect() {
  const client = await clientPromise;
  const db = client.db("bws-ota");
  return db;
}

async function list(): Promise<Interaction[]> {
  try {
    const db = await connect();

    const interactions: Collection<Interaction> = db.collection("interaction");
    const data = await interactions.find().project({ _id: 0 }).sort("_id", "desc").toArray();

    return data as unknown as Interaction[]

  } catch (error: any) {
    console.error('[error/interaction-repo] (list)', error.toString())
    throw new Error();
  }
}

async function listWithFirmwareByImei(props: { imei?: string }): Promise<(Interaction & { firmware: Firmware })[]> {
  try {
    const { imei } = props
    const db = await connect();

    const interactions: Collection<Interaction> = db.collection("interaction");
    const match = imei ? {
      imei: {
        $regex: imei,
        $options: "i",
        $ne: null
      }
    } : { imei: { $ne: null } }
    const data = await interactions.aggregate([
      {
        $match: { ...match }
      },
      {
        $lookup: {
          from: "firmware",
          as: "firmware",
          foreignField: "uuid",
          localField: "firmware_uuid"
        }
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          name: 1,
          requested_at: 1,
          imei: 1,
          firmware: { $arrayElemAt: ["$firmware", 0] }
        }
      },
    ]).toArray();
    console.log("dataaaaaa", data.length)

    return data as unknown as (Interaction & { firmware: Firmware })[]

  } catch (error: any) {
    console.error('[error/interaction-repo] (listWithFirmwareByImei)', error.toString())
    throw new Error();
  }
}


export const interactionRepo = {
  list,
  listWithFirmwareByImei
}