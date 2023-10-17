import type { LoadSurveyByIdRepository, LoadSurveyResultRepository } from '~/data/protocols'
import type { SurveyResultModel } from '~/domain/models'
import type { LoadSurveyResult } from '~/domain/usecases'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (surveyResult) {
      return surveyResult
    }

    await this.loadSurveyByIdRepository.loadById(surveyId)
  }
}
