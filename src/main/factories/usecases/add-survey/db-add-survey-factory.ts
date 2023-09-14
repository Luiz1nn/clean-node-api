import { DbAddSurvey } from '~/data'
import type { AddSurvey } from '~/domain'
import { SurveyMongoRepository } from '~/infra'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
