import type { HashComparer, LoadAccountByEmailRepository, TokenGenerator } from '~/data'
import type { Authentication, AuthenticationModel } from '~/domain'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth ({ email, password }: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(email)

    if (account) {
      await this.hashComparer.compare(password, account.password)
      await this.tokenGenerator.generate(account.id)
    }

    return await new Promise(resolve => resolve(null))
  }
}
