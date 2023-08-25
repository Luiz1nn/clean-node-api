import { describe, expect, it } from 'vitest'
import { MissingParamError, type Validation } from '~/presentation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  it('should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
