import { describe, expect, it, vi } from 'vitest'
import { AddAccountRepositorySpy, HasherSpy, LoadAccountByEmailRepositorySpy } from '~/data/test'
import { mockAccountModel, mockAddAccountParams, throwError } from '~/domain/test'
import { DbAddAccount } from './db-add-account'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  vi.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValue(Promise.resolve(null))
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy)
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy
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
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const addSpy = vi.spyOn(addAccountRepositorySpy, 'add')
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
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    vi.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })

  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const loadSpy = vi.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
