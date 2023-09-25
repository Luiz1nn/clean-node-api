import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import request from 'supertest'
import type { Express } from 'express'
import type { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { MongoHelper } from '~/infra'
import { env, setupApp } from '../config'

let surveyCollection: Collection
let accountCollection: Collection
let app: Express

describe('Survey Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(globalThis.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    it('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(403)
    })

    it('should return 204 on add survey with valid accessToken', async () => {
      const { insertedId } = await accountCollection.insertOne({
        name: 'Luis',
        email: 'luis@mail.com',
        password: '123',
        role: 'admin'
      })
      const accessToken = sign(insertedId.toString(), env.jwtSecret)
      await accountCollection.updateOne({
        _id: insertedId
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    it('should return 403 on load survey without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })
  })
})
