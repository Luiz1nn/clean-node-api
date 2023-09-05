import { defineConfig } from 'tsup'

export default defineConfig({
  outDir: 'dist',
  entry: ['src', '!src/**/*.spec.ts', '!src/**/*.test.ts'],
  splitting: false,
  clean: true,
  sourcemap: true
})
