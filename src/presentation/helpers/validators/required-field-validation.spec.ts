import { describe, expect, it } from 'vitest'
import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '~/presentation/errors'

describe('RequiredField Validation', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
