import { describe, expect, it, vi } from 'vitest'
import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator'

vi.mock('validator', async () => {
  const actual = await vi.importActual('validator')
  return {
    ...(actual as typeof validator),
    isEmail (): boolean {
      return true
    }
  }
})

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    vi.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  it('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = vi.spyOn(validator, 'isEmail')
    sut.isValid('valid_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
