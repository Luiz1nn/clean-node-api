import { type Controller, type HttpRequest, type HttpResponse } from '~/presentation'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(httpRequest)
    return { statusCode: 0, body: {} }
  }
}
