import type { SurveyModel } from '../models'
import type { AddSurveyParams } from '../usecases'

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer'
    },
    {
      answer: 'other_answer',
      image: 'any_image'
    }
  ],
  date: new Date()
})

export const mockSurveyModel = (): SurveyModel => Object.assign({}, mockAddSurveyParams(), {
  id: 'any_id'
})

export const mockSurveyModels = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel()
])
