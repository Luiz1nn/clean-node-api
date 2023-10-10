import type { SurveyModel } from '../models'
import type { AddSurveyParams } from '../usecases'

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

export const mockSurveyModel = (): SurveyModel => Object.assign({}, mockAddSurveyParams(), {
  id: 'any_id'
})

export const mockSurveyModels = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel()
])
