import { badRequest, type Controller, type HttpRequest, type HttpResponse, type Validation } from '~/presentation'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle ({ body }: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(body)
    if (error) {
      return badRequest(error)
    }
    return await new Promise(resolve => resolve(null))
  }
}
