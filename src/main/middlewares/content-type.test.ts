import { describe, it } from 'vitest'
import { app } from '../config'
import request from 'supertest'

describe('Content Type Middleware', () => {
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
