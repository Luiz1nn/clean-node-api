import { DbLoadAccountByToken } from '~/data'
import type { LoadAccountByToken } from '~/domain'
import { AccountMongoRepository, JwtAdapter } from '~/infra'
import env from '~/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
