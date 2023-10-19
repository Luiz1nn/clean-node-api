import { describe, expect, it, vi } from 'vitest'
import { badRequest, ok, serverError, forbidden } from '~/presentation/helpers'
import { EmailInUseError, MissingParamError, ServerError } from '~/presentation/errors'
import type { Validation } from '~/presentation/protocols'
import { AddAccountSpy, AuthenticationSpy, mockValidation } from '~/presentation/test'
import { SignUpController } from './signup-controller'
import { throwError } from '~/domain/test'
import { faker } from '@faker-js/faker'

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  validationStub: Validation
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationStub = mockValidation()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(addAccountSpy, validationStub, authenticationSpy)
  return {
    sut,
    addAccountSpy,
    validationStub,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  it('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    vi.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)))
  })

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual({
      name: request.name,
      email: request.email,
      password: request.password
    })
  })

  it('should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountSpy } = makeSut()
    vi.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  it('should return 200 if valid data is provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(authenticationSpy.result))
  })

  it('should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = vi.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  it('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    vi.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      email: request.email,
      password: request.password
    })
  })

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    vi.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
