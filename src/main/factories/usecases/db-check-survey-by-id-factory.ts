import { DbCheckSurveyById } from '~/data/usecases'
import type { CheckSurveyById } from '~/domain/usecases'
import { SurveyMongoRepository } from '~/infra/db'

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbCheckSurveyById(surveyMongoRepository)
}
