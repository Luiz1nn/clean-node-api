import type { AddAccountRepository } from '~/data'
import type { AddAccountModel, AccountModel } from '~/domain'
import { MongoHelper } from '../helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    return Object.assign({}, accountData, { id: insertedId.toString() })
  }
}
