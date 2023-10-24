import { mockSurveyResultModel } from '~/tests/domain/mocks'
import type { LoadSurveyResult, SaveSurveyResult } from '~/domain/usecases'

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  accountId: string
  result = mockSurveyResultModel()

  async load (surveyId: string, accountId: string): Promise<LoadSurveyResult.Result> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.result
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params
  result = mockSurveyResultModel()

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    this.params = params
    return this.result
  }
}
