import type { LoadSurveys } from '~/domain'
import { noContent, ok, serverError } from '~/presentation'
import type { Controller, HttpRequest, HttpResponse } from '~/presentation'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
