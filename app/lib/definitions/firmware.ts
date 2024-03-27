export interface Firmware {
  uuid: string
  created_at: Date
  name: string
  description: string
  version: string
  current: boolean
  file: {
    url: string
    bucket: string
    name: string
  }
}