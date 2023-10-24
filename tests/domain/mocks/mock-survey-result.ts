import { faker } from '@faker-js/faker'
import type { SurveyResultModel } from '~/domain/models'
import { type SaveSurveyResult } from '~/domain/usecases'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  accountId: faker.string.uuid(),
  surveyId: faker.string.uuid(),
  answer: faker.lorem.word(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.string.uuid(),
  question: faker.lorem.words(),
  answers: [
    {
      answer: faker.lorem.word(),
      count: faker.number.int({ min: 0, max: 1000 }),
      percent: faker.number.int({ min: 0, max: 1000 })
    },
    {
      answer: faker.lorem.word(),
      image: faker.image.url(),
      count: faker.number.int({ min: 0, max: 1000 }),
      percent: faker.number.int({ min: 0, max: 1000 })
    }
  ],
  date: faker.date.recent()
})
