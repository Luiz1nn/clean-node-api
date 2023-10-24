import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import MockDate from 'mockdate'
import { throwError } from '~/tests/domain/mocks'
import { InvalidParamError } from '~/presentation/errors'
import { forbidden, ok, serverError } from '~/presentation/helpers'
import { CheckSurveyByIdSpy, LoadSurveyResultSpy } from '~/tests/presentation/mocks'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { faker } from '@faker-js/faker'

const mockRequest = (): LoadSurveyResultController.Request => ({
  surveyId: faker.string.uuid(),
  accountId: faker.string.uuid()
})

type SutTypes = {
  sut: LoadSurveyResultController
  checkSurveybyIdSpy: CheckSurveyByIdSpy
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const checkSurveybyIdSpy = new CheckSurveyByIdSpy()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(checkSurveybyIdSpy, loadSurveyResultSpy)
  return {
    sut,
    checkSurveybyIdSpy,
    loadSurveyResultSpy
  }
}

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call CheckSurveybyId with correct id', async () => {
    const { sut, checkSurveybyIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkSurveybyIdSpy.id).toBe(request.surveyId)
  })

  it('should return 403 if CheckSurveybyId returns false', async () => {
    const { sut, checkSurveybyIdSpy } = makeSut()
    checkSurveybyIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 if CheckSurveybyId throws', async () => {
    const { sut, checkSurveybyIdSpy } = makeSut()
    vi.spyOn(checkSurveybyIdSpy, 'checkById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should call LoadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSurveyResultSpy.surveyId).toBe(request.surveyId)
    expect(loadSurveyResultSpy.accountId).toBe(request.accountId)
  })

  it('should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    vi.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSurveyResultSpy.result))
  })
})
