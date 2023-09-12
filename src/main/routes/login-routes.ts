import type { Router } from 'express'
import { makeSignUpController, makeLoginController } from '~/main'
import { adaptRoute } from '../adapters'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
