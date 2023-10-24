import { describe, expect, it, vi } from 'vitest'
import { makeAddSurveyValidation } from '~/main/factories'
import type { Validation } from '~/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '~/validation/validators'

vi.mock('~/validation/validators')

describe('AddSurveyValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
