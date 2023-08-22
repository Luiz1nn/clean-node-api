import { describe, expect, it } from 'vitest'
import { LoginController } from './login'
import { badRequest } from '../helpers'
import { MissingParamError } from '../errors'

describe('Login Controller', () => {
  it('should return 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
