export interface Firmware {
  uuid: string
  created_at: Date
  name: string
  description: string
  version: string
  current: boolean
  url: string
  bucket: string
}