import { DbAddAccount } from '~/data'
import { BcryptAdapter, AccountMongoRepository } from '~/infra'
import { SignUpController } from '~/presentation'
import { EmailValidatorAdapter } from '~/utils'

export const makeSingUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
