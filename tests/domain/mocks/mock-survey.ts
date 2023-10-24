import { faker } from '@faker-js/faker'
import type { SurveyModel } from '~/domain/models'
import type { AddSurvey } from '~/domain/usecases'

export const mockAddSurveyParams = (): AddSurvey.Params => ({
  question: faker.lorem.word(),
  answers: [
    {
      answer: faker.lorem.word(),
      image: faker.image.url()
    },
    {
      answer: faker.lorem.word()
    }
  ],
  date: faker.date.recent()
})

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.string.uuid(),
  question: faker.lorem.word(),
  answers: [
    {
      answer: faker.lorem.word()
    },
    {
      answer: faker.lorem.word(),
      image: faker.image.url()
    }
  ],
  date: faker.date.recent()
})

export const mockSurveyModels = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel()
])
