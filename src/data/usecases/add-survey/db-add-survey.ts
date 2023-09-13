import type { AddSurveyRepository } from '~/data'
import type { AddSurvey, AddSurveyModel } from '~/domain'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
