import request from 'supertest'
import { beforeAll, describe, it } from 'vitest'
import type { Express } from 'express'
import { setupApp } from '~/main/config'

let app: Express

describe('Body Parser Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  it('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Luis' })
      .expect({ name: 'Luis' })
  })
})
