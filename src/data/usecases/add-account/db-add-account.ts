import type { AddAccountRepository, Encrypter } from '~/data'
import type { AccountModel, AddAccount, AddAccountModel } from '~/domain'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return await new Promise(resolve => {
      resolve({
        id: '',
        name: '',
        email: '',
        password: ''
      })
    })
  }
}
