import type { AddAccountRepository, LoadAccountByEmailRepository } from '~/data'
import type { AddAccountModel, AccountModel } from '~/domain'
import { MongoHelper } from '../helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    return MongoHelper.map({ ...accountData, _id: insertedId })
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map({ ...account, _id: account?._id })
  }
}
