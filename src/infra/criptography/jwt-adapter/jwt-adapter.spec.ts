import jwt from 'jsonwebtoken'
import { describe, expect, it, vi } from 'vitest'
import { JwtAdapter } from './jwt-adapter'

describe('Jwt Adapter', () => {
  it('should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = vi.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  it('should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')
    vi.spyOn(jwt, 'sign').mockImplementationOnce(() => 'any_token')
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })
})
