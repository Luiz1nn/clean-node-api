import type { LoadSurveyById } from '~/domain/usecases'
import { InvalidParamError } from '~/presentation/errors'
import { forbidden } from '~/presentation/helpers'
import type { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle ({ params }: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(params.surveyId)
    return forbidden(new InvalidParamError('surveyId'))
  }
}
