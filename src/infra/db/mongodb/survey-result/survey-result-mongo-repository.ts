import { ObjectId } from 'mongodb'
import type { SaveSurveyResultRepository } from '~/data/protocols'
import type { SurveyResultModel } from '~/domain/models'
import type { SaveSurveyResultModel } from '~/domain/usecases'
import { MongoHelper } from '../helper/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const { value } = await surveyResultCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId)
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })

    return value && MongoHelper.map(value)
  }
}
