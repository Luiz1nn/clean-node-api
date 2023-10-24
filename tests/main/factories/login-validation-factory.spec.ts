import { describe, expect, it, vi } from 'vitest'
import { EmailValidatorAdapter } from '~/infra/validators'
import { makeLoginValidation } from '~/main/factories'
import type { Validation } from '~/presentation/protocols'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation
} from '~/validation/validators'

vi.mock('~/validation/validators')

describe('LoginValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
