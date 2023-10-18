import { describe, expect, it, vi } from 'vitest'
import type { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '~/data/protocols'
import {
  EncrypterSpy,
  HashComparerSpy,
  mockLoadAccountByEmailRepository,
  mockUpdateAccessTokenRepositoryStub
} from '~/data/test'
import { mockAuthenticationParams, throwError } from '~/domain/test'
import { DbAuthentication } from './db-authentication'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepositoryStub()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositoryStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadSpy).toHaveBeenCalledWith(authenticationParams.email)
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBeNull()
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    const compareSpy = vi.spyOn(hashComparerSpy, 'compare')
    await sut.auth(authenticationParams)
    expect(compareSpy).toHaveBeenCalledWith(authenticationParams.password, 'any_password')
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    vi.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    vi.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBeNull()
  })

  it('should call Encrypter with correct id', async () => {
    const { sut, encrypterSpy } = makeSut()
    const encryptSpy = vi.spyOn(encrypterSpy, 'encrypt')
    await sut.auth(mockAuthenticationParams())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    vi.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return a token on success', async () => {
    const { sut, encrypterSpy } = makeSut()
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBe(encrypterSpy.ciphertext)
  })

  it('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub, encrypterSpy } = makeSut()
    const updateAccessTokenSpy = vi.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthenticationParams())
    expect(updateAccessTokenSpy).toHaveBeenCalledWith('any_id', encrypterSpy.ciphertext)
  })

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    vi.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
})
