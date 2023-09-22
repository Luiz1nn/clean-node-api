import type { AddSurveyRepository } from '~/data'
import type { AddSurveyModel } from '~/domain'
import { MongoHelper } from '../helper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}