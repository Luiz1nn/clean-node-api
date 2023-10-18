import type { AccountModel } from '~/domain/models'

export interface AddAccount {
  add: (accountData: AddAccount.Params) => Promise<AccountModel>
}

export namespace AddAccount {
  export type Params = Omit<AccountModel, 'id'>
  export type Result = AccountModel
}
