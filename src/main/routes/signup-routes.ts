import type { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeSingUpController } from '../factories'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSingUpController()))
}
