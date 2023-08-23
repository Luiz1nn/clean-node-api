import type { Authentication } from '~/domain'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError, unauthorized } from '../helpers'
import type { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.authentication.auth(email, password)

      return unauthorized()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
