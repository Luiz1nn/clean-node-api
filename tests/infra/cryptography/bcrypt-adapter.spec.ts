import { describe, expect, it, vi } from 'vitest'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from '~/infra/cryptography'

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = vi.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return a valid hash on hash success', async () => {
      const sut = makeSut()
      vi.spyOn(bcrypt, 'hash').mockImplementation(async () => await Promise.resolve('hash'))
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
    })

    it('should throw if hash throws', async () => {
      const sut = makeSut()
      vi.spyOn(bcrypt, 'hash').mockImplementation(async () => await Promise.reject(new Error()))
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    it('should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = vi.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    it('should return true when compare succeeds', async () => {
      const sut = makeSut()
      vi.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => await Promise.resolve(false))
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(false)
    })

    it('should throw if compare throws', async () => {
      const sut = makeSut()
      vi.spyOn(bcrypt, 'compare').mockImplementation(async () => await Promise.reject(new Error()))
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
