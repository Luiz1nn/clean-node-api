import { describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { InvalidParamError } from '~/presentation/errors'
import { EmailValidation } from '~/validation/validators'
import { throwError } from '~/tests/domain/mocks'
import { EmailValidatorSpy } from '~/tests/validation/mocks'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const field = faker.lorem.word()

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  it('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const email = faker.internet.email()
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })

  it('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ [field]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  it('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    vi.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
