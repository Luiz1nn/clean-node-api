import type { AddSurvey } from '~/domain'
import { badRequest, serverError } from '~/presentation'
import type { Controller, HttpRequest, HttpResponse, Validation } from '~/presentation'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle ({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = body
      await this.addSurvey.add({ question, answers })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
