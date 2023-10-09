import type { LoadSurveyById, SaveSurveyResult } from '~/domain/usecases'
import { InvalidParamError } from '~/presentation/errors'
import { forbidden, ok, serverError } from '~/presentation/helpers'
import type { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle ({ params, body, accountId }: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(params.surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(body.answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId: params.surveyId,
        answer: body.answer,
        date: new Date()
      })

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
