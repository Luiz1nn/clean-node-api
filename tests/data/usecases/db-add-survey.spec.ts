import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import MockDate from 'mockdate'
import { DbAddSurvey } from '~/data/usecases'
import { mockAddSurveyParams, throwError } from '~/domain/test'
import { AddSurveyRepositorySpy } from '~/tests/data/mocks'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositorySpy: AddSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)
  return {
    sut,
    addSurveyRepositorySpy
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    const surveyData = mockAddSurveyParams()
    await sut.add(surveyData)
    expect(addSurveyRepositorySpy.params).toEqual(surveyData)
  })

  it('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    vi.spyOn(addSurveyRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
