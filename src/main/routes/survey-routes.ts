import { type Router } from 'express'
import { makeAddSurveyController } from '~/main'
import { adaptRoute } from '../adapters'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
