import type { Router } from 'express'
import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '~/main/factories'
import { auth } from '~/main/middlewares/auth'
import { adaptRoute } from '../adapters'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
