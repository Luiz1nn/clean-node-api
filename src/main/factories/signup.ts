import { DbAddAccount } from '~/data'
import { BcryptAdapter, AccountMongoRepository, LogMongoRepository } from '~/infra'
import { type Controller, SignUpController, type Validation } from '~/presentation'
import { EmailValidatorAdapter } from '~/utils'
import { LogControllerDecorator } from '../decorators'

class Validator implements Validation {
  validate (input: any): Error | null {
    return null
  }
}

export const makeSingUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const validator = new Validator()
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, validator)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
