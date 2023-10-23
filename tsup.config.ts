import { defineConfig } from 'tsup'

export default defineConfig({
  outDir: 'dist',
  entry: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/*.test.ts', '!src/**/test'],
  splitting: false,
  clean: true,
  minify: true
})
