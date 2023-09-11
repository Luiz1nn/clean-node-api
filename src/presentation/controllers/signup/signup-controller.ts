import type { AddAccount, Authentication } from '~/domain'
import { badRequest, ok, serverError } from '~/presentation'
import type { Validation, HttpResponse, Controller, HttpRequest } from '~/presentation'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      await this.authentication.auth({ email, password })

      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
