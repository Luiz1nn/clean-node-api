import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./setup/mongo-memory-server.ts'],
    coverage: {
      provider: 'v8',
      exclude: ['src/main/adapters/**', 'src/infra/db/mongodb/mongo-helper.ts']
    }
  },
  resolve: {
    alias: [{ find: '~/tests', replacement: resolve(__dirname, './tests') }, { find: '~', replacement: resolve(__dirname, './src') }]
  }
})
