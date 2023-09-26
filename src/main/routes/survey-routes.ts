import type { Router } from 'express'
import { makeAddSurveyController, makeLoadSurveysController } from '~/main/factories'
import { adaptRoute } from '../adapters'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
