import { makeDbAuthentication, makeLogControllerDecorator } from '~/main'
import { type Controller, LoginController } from '~/presentation'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
