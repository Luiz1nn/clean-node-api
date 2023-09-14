import { describe, expect, it, vi } from 'vitest'
import type { Validation } from '~/presentation'
import { ValidationComposite, RequiredFieldValidation } from '~/validation'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

vi.mock('~/validation')

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
