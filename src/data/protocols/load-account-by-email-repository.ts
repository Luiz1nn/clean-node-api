import { type AccountModel } from '~/domain'

export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<AccountModel>
}
