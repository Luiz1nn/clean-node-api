export interface CheckSurveybyId {
  checkById: (id: string) => Promise<CheckSurveybyId.Result>
}

export namespace CheckSurveybyId {
  export type Result = boolean
}
