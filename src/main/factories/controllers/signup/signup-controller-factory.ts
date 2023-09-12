import { makeDbAddAccount, makeDbAuthentication, makeLogControllerDecorator } from '~/main'
import { type Controller, SignUpController } from '~/presentation'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
