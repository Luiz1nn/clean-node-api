import { DbAuthentication } from '~/data'
import {
  AccountMongoRepository,
  BcryptAdapter,
  LogMongoRepository,
  JwtAdapter
} from '~/infra'
import { LogControllerDecorator } from '~/main'
import env from '~/main/config/env'
import { type Controller, LoginController } from '~/presentation'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
