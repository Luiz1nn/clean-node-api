import { DbAuthentication } from '~/data/usecases'
import type { Authentication } from '~/domain/usecases'
import { BcryptAdapter, JwtAdapter } from '~/infra/cryptography'
import { AccountMongoRepository } from '~/infra/db'
import env from '~/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
