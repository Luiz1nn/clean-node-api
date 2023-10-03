import type { SaveSurveyResultRepository } from '~/data/protocols'
import type { SurveyResultModel } from '~/domain/models'
import type { SaveSurveyResult, SaveSurveyResultModel } from '~/domain/usecases'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
