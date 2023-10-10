import type { Router } from 'express'
import { makeSaveSurveyResultController } from '~/main/factories'
import { adaptRoute } from '../adapters'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
