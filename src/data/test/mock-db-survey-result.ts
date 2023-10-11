import type { SurveyResultModel } from '~/domain/models'
import { mockSurveyResultModel } from '~/domain/test'
import type { SaveSurveyResultParams } from '~/domain/usecases'
import type { SaveSurveyResultRepository } from '../protocols'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
