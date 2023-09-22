import { DbAuthentication } from '~/data'
import { type Authentication } from '~/domain'
import { AccountMongoRepository, BcryptAdapter, JwtAdapter } from '~/infra'
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
