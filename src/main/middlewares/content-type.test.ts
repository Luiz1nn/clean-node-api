import request from 'supertest'
import { beforeAll, describe, it } from 'vitest'
import type { Express } from 'express'
import { setupApp } from '../config'

let app: Express

describe('Content Type Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  it('should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  it('should return xml content type when force', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send()
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
