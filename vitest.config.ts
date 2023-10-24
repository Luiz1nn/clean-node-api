import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./setup/mongo-memory-server.ts']
  },
  resolve: {
    alias: [{ find: '~/tests', replacement: resolve(__dirname, './tests') }, { find: '~', replacement: resolve(__dirname, './src') }]
  }
})
