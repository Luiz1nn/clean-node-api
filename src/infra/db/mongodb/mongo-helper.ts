import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  url: '',

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      this.client = await MongoClient.connect(this.url)
    }

    return this.client.db().collection(name)
  },

  map (data: any): any {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}