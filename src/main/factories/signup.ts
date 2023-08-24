import { DbAddAccount } from '~/data'
import { BcryptAdapter, AccountMongoRepository, LogMongoRepository } from '~/infra'
import { type Controller, SignUpController } from '~/presentation'
import { LogControllerDecorator } from '../decorators'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
