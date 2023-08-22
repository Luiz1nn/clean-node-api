import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { MongoHelper } from '../helper'
import { type Collection } from 'mongodb'
import { LogMongoRepository } from './log'

const makeSut = (): LogMongoRepository => (new LogMongoRepository())

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  it('should create an error log on sucess', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
