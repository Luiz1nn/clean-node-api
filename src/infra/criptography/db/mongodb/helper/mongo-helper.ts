import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (): Promise<void> {
    this.client = await MongoClient.connect(globalThis.__MONGO_URI__)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
