export class AnalyticsValidator {
  static validateSurveyId(surveyId: string) {
    if (!surveyId) {
      throw new Error("Survey id is required");
    }
  }
}
