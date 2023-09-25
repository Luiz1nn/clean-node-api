import { makeDbLoadSurveys, makeLogControllerDecorator } from '~/main'
import { LoadSurveysController, type Controller } from '~/presentation'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
