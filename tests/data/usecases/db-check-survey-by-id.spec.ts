import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'
import { DbCheckSurveyById } from '~/data/usecases'
import { throwError } from '~/domain/test'
import { CheckSurveyByIdRepositorySpy } from '~/tests/data/mocks'

type SutTypes = {
  sut: DbCheckSurveyById
  checkSurveyByIdRepositorySpy: CheckSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositorySpy)
  return {
    sut,
    checkSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('DbCheckSurveyById Usecase', () => {
  beforeEach(() => {
    surveyId = faker.string.uuid()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call CheckSurveyByIdRepository', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    await sut.checkById(surveyId)
    expect(checkSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  it('should return true if CheckSurveyByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById(surveyId)
    expect(exists).toBe(true)
  })

  it('should return false if CheckSurveyByIdRepository returns false', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    checkSurveyByIdRepositorySpy.result = false
    const exists = await sut.checkById(surveyId)
    expect(exists).toBe(false)
  })

  it('should throw if CheckSurveyByIdRepository throws', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    vi.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
