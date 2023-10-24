import { beforeEach, describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { DbLoadAnswersBySurvey } from '~/data/usecases'
import { throwError } from '~/domain/test'
import { LoadAnswersBySurveyRepositorySpy } from '~/tests/data/mocks'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadAnswersBySurveyRepositorySpy: LoadAnswersBySurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositorySpy = new LoadAnswersBySurveyRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositorySpy)
  return {
    sut,
    loadAnswersBySurveyRepositorySpy
  }
}

let surveyId: string

describe('DbLoadAnswersBySurvey', () => {
  beforeEach(() => {
    surveyId = faker.string.uuid()
  })

  it('should call LoadAnswersBySurveyRepository', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    await sut.loadAnswers(surveyId)
    expect(loadAnswersBySurveyRepositorySpy.id).toBe(surveyId)
  })

  it('should return answers on success', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([
      loadAnswersBySurveyRepositorySpy.result[0],
      loadAnswersBySurveyRepositorySpy.result[1]
    ])
  })

  it('should return empty array if LoadAnswersBySurveyRepository returns []', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    loadAnswersBySurveyRepositorySpy.result = []
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([])
  })

  it('should throw if LoadAnswersBySurveyRepository throws', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    vi.spyOn(loadAnswersBySurveyRepositorySpy, 'loadAnswers').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
