import { describe, expect, it, vi } from 'vitest'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

vi.mock('bcrypt', async () => {
  const actual: typeof bcrypt = await vi.importActual('bcrypt')
  return {
    ...actual,
    async hash (): Promise<string> {
      return await new Promise(resolve => resolve('hash'))
    },
    async compare (): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
})

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = vi.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a valid hash on hash success', async () => {
    const sut = makeSut()
    vi.spyOn(bcrypt, 'hash').mockImplementation(async () => {
      return await new Promise(resolve => { resolve('hash') })
    })
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  it('should throw if bcrypt throws', async () => {
    const sut = makeSut()
    vi.spyOn(bcrypt, 'hash').mockImplementation(async () => await new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  it('should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = vi.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  it('should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })
})
