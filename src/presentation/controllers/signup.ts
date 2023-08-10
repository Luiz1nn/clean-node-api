import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'
import type { HttpRequest, HttpResponse } from '../protocols'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 400,
      body: {}
    }
  }
}
