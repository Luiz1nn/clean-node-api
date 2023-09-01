import type { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '~/data'
import type { AddAccountModel, AccountModel } from '~/domain'
import { MongoHelper } from '../helper'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
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

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: ObjectId.createFromHexString(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}