import dotenv from 'dotenv'
dotenv.config()

export const config = {
  FIREBASE_CONFIG: (process.env.FIREBASE_CONFIG && JSON.parse(process.env.FIREBASE_CONFIG as string)) || "",
  MONGO_URI: process.env.MONGO_URI || "",
}