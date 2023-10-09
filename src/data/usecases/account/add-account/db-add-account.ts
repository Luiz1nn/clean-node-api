import type { AddAccountRepository, Hasher, LoadAccountByEmailRepository } from '~/data/protocols'
import type { AccountModel } from '~/domain/models'
import type { AddAccount, AddAccountModel } from '~/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add({
        ...accountData,
        password: hashedPassword
      })
      return newAccount
    }

    return null
  }
}