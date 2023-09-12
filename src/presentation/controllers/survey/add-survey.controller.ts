import type { Controller, HttpRequest, HttpResponse, Validation } from '~/presentation'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle ({ body }: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(body)
    return await new Promise(resolve => resolve(null))
  }
}
