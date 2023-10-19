import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import MockDate from 'mockdate'
import { throwError } from '~/domain/test'
import { badRequest, serverError, noContent } from '~/presentation/helpers'
import type { Validation } from '~/presentation/protocols'
import { AddSurveySpy, mockValidation } from '~/presentation/test'
import { AddSurveyController } from './add-survey-controller'
import { faker } from '@faker-js/faker'

const mockRequest = (): AddSurveyController.Request => ({
  question: faker.lorem.word(),
  answers: [{
    image: faker.image.url(),
    answer: faker.lorem.word()
  }]

})

type SutTypes = {
  sut: AddSurveyController
  validationStub: Validation
  addSurveySpy: AddSurveySpy
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addSurveySpy = new AddSurveySpy()
  const sut = new AddSurveyController(validationStub, addSurveySpy)
  return {
    sut,
    validationStub,
    addSurveySpy
  }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = vi.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    vi.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('should call AddSurvey with correct values', async () => {
    const { sut, addSurveySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addSurveySpy.params).toEqual({ ...request, date: new Date() })
  })

  it('should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveySpy } = makeSut()
    vi.spyOn(addSurveySpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
