import { Router, type Express } from 'express'
import { loginRoutes } from '../routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  loginRoutes(router)
}
