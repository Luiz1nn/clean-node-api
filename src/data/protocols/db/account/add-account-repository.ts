import type { AccountModel, AddAccountModel } from '~/domain'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
