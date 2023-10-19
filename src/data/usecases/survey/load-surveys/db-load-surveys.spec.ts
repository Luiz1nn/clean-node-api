import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'
import { LoadSurveysRepositorySpy } from '~/data/test'
import { throwError } from '~/domain/test'
import { DbLoadSurveys } from './db-load-surveys'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepositorySpy)
  return {
    sut,
    loadSurveysRepositorySpy
  }
}

let accountId: string

describe('DbLoadSurveys Usecase', () => {
  beforeEach(() => {
    accountId = faker.string.uuid()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    await sut.load(accountId)
    expect(loadSurveysRepositorySpy.accountId).toBe(accountId)
  })

  it('should return a list of Surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const surveys = await sut.load(accountId)
    expect(surveys).toBe(loadSurveysRepositorySpy.result)
  })

  it('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    vi.spyOn(loadSurveysRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(accountId)
    await expect(promise).rejects.toThrow()
  })
})
