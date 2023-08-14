import { describe, expect, it, vi } from 'vitest'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = vi.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    vi.spyOn(bcrypt, 'hash').mockImplementation(async () => {
      return await new Promise(resolve => { resolve('hash') })
    })
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
