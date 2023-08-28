import type { LoadAccountByEmailRepository } from '~/data'
import type { Authentication, AuthenticationModel } from '~/domain'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth ({ email }: AuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.load(email)
    return await new Promise(resolve => resolve(null))
  }
}
