import { faker } from '@faker-js/faker'
import type { AddAccount, Authentication } from '../usecases'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
