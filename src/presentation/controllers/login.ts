import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'
import type { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }

    this.emailValidator.isValid(httpRequest.body.email)

    return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
  }
}
