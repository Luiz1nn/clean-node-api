import { afterAll, beforeAll } from 'vitest'
import { setup, teardown } from 'vitest-mongodb'

beforeAll(async () => {
  await setup({
    type: 'default',
    serverOptions: {
      instance: {
        dbName: 'vitest'
      }
    }
  })
})

afterAll(async () => {
  await teardown()
})
