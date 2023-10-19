import type { CheckSurveyByIdRepository } from '~/data/protocols'
import type { CheckSurveybyId } from '~/domain/usecases'

export class DbCheckSurveyById implements CheckSurveybyId {
  constructor (private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository) {}
  async checkById (id: string): Promise<CheckSurveybyId.Result> {
    return await this.checkSurveyByIdRepository.checkById(id)
  }
}
