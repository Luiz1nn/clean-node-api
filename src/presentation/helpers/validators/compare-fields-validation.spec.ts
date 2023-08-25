import { describe, expect, it } from 'vitest'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '~/presentation'

describe('CompareFields Validation', () => {
  it('should return a InvalidaParamError if validation fails', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
})
