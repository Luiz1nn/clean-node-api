import { beforeEach, describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { DbLoadAccountByToken } from '~/data/usecases'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '~/tests/data/mocks'
import { throwError } from '~/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}

let token: string
let role: string

describe('DbLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    token = faker.string.uuid()
    role = faker.lorem.word()
  })

  it('should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token, role)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  it('should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  it('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load(token, role)
    expect(loadAccountByTokenRepositorySpy.token).toBe(token)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  it('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.result = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  it('should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.load(token, role)
    expect(account).toEqual(loadAccountByTokenRepositorySpy.result)
  })

  it('should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    vi.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  it('should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    vi.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })
})
