import { faker } from '@faker-js/faker'
import type { AddSurvey, CheckSurveyById, LoadAnswersBySurvey, LoadSurveys } from '~/domain/usecases'
import { mockSurveyModels } from '~/tests/domain/mocks'

export class AddSurveySpy implements AddSurvey {
  params: AddSurvey.Params

  async add (params: AddSurvey.Params): Promise<void> {
    this.params = params
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  id: string
  result = [
    faker.lorem.word(),
    faker.lorem.word()
  ]

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return this.result
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  accountId: string
  result = mockSurveyModels()

  async load (accountId: string): Promise<LoadSurveys.Result> {
    this.accountId = accountId
    return this.result
  }
}
