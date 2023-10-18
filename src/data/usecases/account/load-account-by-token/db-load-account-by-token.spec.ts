import { describe, expect, it, vi } from 'vitest'
import type { LoadAccountByTokenRepository } from '~/data/protocols'
import { DecrypterSpy, mockLoadAccountByTokenRepository } from '~/data/test'
import { mockAccountModel, throwError } from '~/domain/test'
import { DbLoadAccountByToken } from './db-load-account-by-token'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  it('should call Decrypter with correct value', async () => {
    const { sut, decrypterSpy } = makeSut()
    const decryptSpy = vi.spyOn(decrypterSpy, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  it('should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    vi.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  it('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = vi.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  it('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(mockAccountModel())
  })

  it('should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    vi.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  it('should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
