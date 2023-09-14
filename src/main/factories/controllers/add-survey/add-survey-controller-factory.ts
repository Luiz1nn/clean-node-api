import { makeDbAddSurvey, makeLogControllerDecorator } from '~/main'
import { AddSurveyController, type Controller } from '~/presentation'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
