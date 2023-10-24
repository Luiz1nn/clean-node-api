import { faker } from '@faker-js/faker'
import { mockSurveyModel, mockSurveyModels } from '~/domain/test'
import type {
  AddSurveyRepository,
  CheckSurveyByIdRepository,
  LoadAnswersBySurveyRepository,
  LoadSurveyByIdRepository,
  LoadSurveysRepository
} from '~/data/protocols'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  params: AddSurveyRepository.Params

  async add (params: AddSurveyRepository.Params): Promise<void> {
    this.params = params
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadAnswersBySurveyRepositorySpy implements LoadAnswersBySurveyRepository {
  id: string
  result = [
    faker.string.uuid(),
    faker.string.uuid()
  ]

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  result = mockSurveyModel()

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  accountId: string
  result = mockSurveyModels()

  async loadAll (accountId: string): Promise<LoadSurveysRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}
