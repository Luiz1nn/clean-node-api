import type { AddSurveyRepository, LoadSurveysRepository } from '~/data/protocols'
import type { SurveyModel } from '~/domain/models'
import type { AddSurveyModel } from '~/domain/usecases'
import { MongoHelper } from '~/infra/db'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }
}
