import request from 'supertest'
import type { Express } from 'express'
import { beforeAll, describe, it } from 'vitest'
import { setupApp } from '~/main/config'
import { noCache } from '~/main/middlewares'

let app: Express

describe('NoCache Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  it('should disable cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
