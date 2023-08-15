import { describe, it } from 'vitest'
import { app } from '../config'
import request from 'supertest'

describe('CORS Middleware', () => {
  it('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})