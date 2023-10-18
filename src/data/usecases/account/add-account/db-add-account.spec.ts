import { describe, expect, it, vi } from 'vitest'
import type { AddAccountRepository, LoadAccountByEmailRepository } from '~/data/protocols'
import { HasherSpy, mockAddAccountRepository, mockLoadAccountByEmailRepository } from '~/data/test'
import { mockAccountModel, mockAddAccountParams, throwError } from '~/domain/test'
import { DbAddAccount } from './db-add-account'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(Promise.resolve(null))
  const sut = new DbAddAccount(hasherSpy, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherSpy,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  it('should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const hashSpy = vi.spyOn(hasherSpy, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub, hasherSpy } = makeSut()
    const addSpy = vi.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: hasherSpy.digest
    })
  })

  it('should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    vi.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccountModel())
  })

  it('should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })

  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
