import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(globalThis.__MONGO_URI__)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
