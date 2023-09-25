import { type Router } from 'express'
import { makeAddSurveyController, makeAuthMiddleware, makeLoadSurveysController } from '~/main'
import { adaptMiddleware, adaptRoute } from '../adapters'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())

  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
