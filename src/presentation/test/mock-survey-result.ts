import type { SurveyResultModel } from '~/domain/models'
import { mockSurveyResultModel } from '~/domain/test'
import type { SaveSurveyResult, SaveSurveyResultParams } from '~/domain/usecases'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultStub()
}
