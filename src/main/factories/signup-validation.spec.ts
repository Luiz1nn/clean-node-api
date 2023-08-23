import { describe, expect, it, vi } from 'vitest'
import { makeSingUpValidation } from './signup-validation'
import { ValidationComposite, RequiredFieldValidation, type Validation } from '~/presentation'

vi.mock('~/presentation')

describe('SignUpValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSingUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
