import { DbLoadSurveyResult } from '~/data/usecases'
import type { LoadSurveyResult } from '~/domain/usecases'
import { SurveyMongoRepository, SurveyResultMongoRepository } from '~/infra/db'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
