import { Router, type Express } from 'express'
import { loginRoutes, surveyResultRoutes, surveyRoutes } from '../routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  loginRoutes(router)
  surveyResultRoutes(router)
  surveyRoutes(router)
}
