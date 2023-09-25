import type { LoadSurveysRepository } from '~/data'
import type { LoadSurveys, SurveyModel } from '~/domain'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll()
    return []
  }
}
