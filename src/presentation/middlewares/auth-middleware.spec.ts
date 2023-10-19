import { describe, expect, it, vi } from 'vitest'
import { throwError } from '~/domain/test'
import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers'
import { LoadAccountByTokenSpy } from '../test'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy.accessToken).toBe(httpRequest.accessToken)
    expect(loadAccountByTokenSpy.role).toBe(role)
  })

  it('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accountId: loadAccountByTokenSpy.result.id }))
  })

  it('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    vi.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
