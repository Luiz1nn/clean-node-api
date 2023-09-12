import validator from 'validator'
import type { EmailValidator } from '~/validation'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
