import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import request from 'supertest'
import type { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { MongoHelper } from '~/infra'
import { app } from '../config'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST / signup', () => {
    it('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Luis',
          email: 'luis@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST / login', () => {
    it('should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Luis',
        email: 'luis@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'luis@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
