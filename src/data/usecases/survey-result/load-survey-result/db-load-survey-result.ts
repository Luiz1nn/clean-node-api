import type { LoadSurveyResultRepository } from '~/data/protocols'
import type { SurveyResultModel } from '~/domain/models'
import type { LoadSurveyResult } from '~/domain/usecases'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}
