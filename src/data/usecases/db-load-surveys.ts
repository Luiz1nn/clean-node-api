import type { LoadSurveysRepository } from '~/data/protocols'
import type { LoadSurveys } from '~/domain/usecases'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<LoadSurveys.Result> {
    return await this.loadSurveysRepository.loadAll(accountId)
  }
}
