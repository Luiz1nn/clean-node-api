import { DbAddAccount } from '~/data'
import { BcryptAdapter, AccountMongoRepository, LogMongoRepository } from '~/infra'
import { type Controller, SignUpController } from '~/presentation'
import { LogControllerDecorator } from '../decorators'
import { makeSingUpValidation } from './signup-validation'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSingUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
