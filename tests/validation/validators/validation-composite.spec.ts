import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { MissingParamError } from '~/presentation/errors'
import { ValidationComposite } from '~/validation/validators'
import { ValidationSpy } from '~/tests/presentation/mocks'

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

const field = faker.lorem.word()

describe('Validation Composite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.lorem.word() })
    expect(error).toEqual(validationSpies[1].error)
  })

  it('should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.lorem.word() })
    expect(error).toEqual(validationSpies[0].error)
  })

  it('should not return if more validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: faker.lorem.word() })
    expect(error).toBeFalsy()
  })
})
