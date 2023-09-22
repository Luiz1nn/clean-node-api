import jwt from 'jsonwebtoken'
import type { Decrypter, Encrypter } from '~/data'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return await new Promise(resolve => resolve(accessToken))
  }

  async decrypt (value: string): Promise<string> {
    jwt.verify(value, this.secret)
    return await new Promise(resolve => resolve(null))
  }
}
