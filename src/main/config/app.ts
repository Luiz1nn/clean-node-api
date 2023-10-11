import express, { type Express } from 'express'
import setupSwagger from './config-swagger'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()

  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)

  return app
}
