import type { LoadSurveys } from '~/domain'
import { ok, type Controller, type HttpRequest, type HttpResponse } from '~/presentation'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return ok(surveys)
  }
}
