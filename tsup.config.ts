import { defineConfig } from 'tsup'

export default defineConfig({
  outDir: 'dist',
  entry: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/*.test.ts'],
  splitting: false,
  clean: true,
  sourcemap: true
})
