import type { LoadSurveys } from '~/domain'
import type { Controller, HttpRequest, HttpResponse } from '~/presentation'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return null
  }
}
