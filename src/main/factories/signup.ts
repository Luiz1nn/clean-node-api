import { DbAddAccount } from '~/data'
import { BcryptAdapter, AccountMongoRepository } from '~/infra'
import { type Controller, SignUpController } from '~/presentation'
import { EmailValidatorAdapter } from '~/utils'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
