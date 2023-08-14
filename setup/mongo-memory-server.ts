import { afterAll, beforeAll } from 'vitest'
import { setup, teardown } from 'vitest-mongodb'

beforeAll(async () => {
  await setup({
    type: 'default',
    serverOptions: {
      instance: {
        dbName: 'vitest'
      },
      binary: {
        version: '4.0.3'
      }
    }
  })
})

afterAll(async () => {
  await teardown()
})
