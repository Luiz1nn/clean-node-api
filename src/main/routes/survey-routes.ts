import { type Router } from 'express'
import { makeAddSurveyController, makeAuthMiddleware } from '~/main'
import { adaptMiddleware, adaptRoute } from '../adapters'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
