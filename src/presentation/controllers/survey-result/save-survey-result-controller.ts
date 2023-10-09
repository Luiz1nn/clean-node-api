import type { LoadSurveyById } from '~/domain/usecases'
import { InvalidParamError } from '~/presentation/errors'
import { forbidden, serverError } from '~/presentation/helpers'
import type { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle ({ params }: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
