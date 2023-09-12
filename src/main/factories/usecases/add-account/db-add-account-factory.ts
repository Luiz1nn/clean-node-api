import { DbAddAccount } from '~/data'
import type { AddAccount } from '~/domain'
import { AccountMongoRepository, BcryptAdapter } from '~/infra'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
