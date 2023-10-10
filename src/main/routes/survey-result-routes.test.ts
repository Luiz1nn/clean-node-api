import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import type { Express } from 'express'
import { MongoHelper } from '~/infra/db'
import { setupApp } from '../config'

let app: Express

describe('Survey Result Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(globalThis.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('PUT /surveys/:surveyId/results', () => {
    it('should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({ answer: 'Answer 1' })
        .expect(403)
    })
  })
})
