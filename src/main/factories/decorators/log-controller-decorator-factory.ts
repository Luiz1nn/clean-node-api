import { LogMongoRepository } from '~/infra'
import { LogControllerDecorator } from '~/main'
import type { Controller } from '~/presentation'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
