import type { Router } from 'express'
import { makeAddSurveyController, makeLoadSurveysController } from '~/main/factories'
import { auth } from '~/main/middlewares/auth'
import { adaptRoute } from '../adapters'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
