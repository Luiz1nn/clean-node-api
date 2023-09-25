import { type SurveyModel } from '~/domain'

export interface LoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}
