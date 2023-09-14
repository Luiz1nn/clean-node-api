import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers'
import type { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError())
    return await new Promise(resolve => resolve(error))
  }
}
