import jwt from 'jsonwebtoken'
import type { Encrypter } from '~/data'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    jwt.sign({ id: value }, this.secret)
    return ''
  }
}
