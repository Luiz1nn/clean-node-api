import type { Router } from 'express'
import { adaptRoute } from '~/main/adapters'
import { makeAddSurveyController, makeLoadSurveysController } from '~/main/factories'
import { auth } from '~/main/middlewares/auth'
import { adminAuth } from '~/main/middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
