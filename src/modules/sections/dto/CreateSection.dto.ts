export interface CreateSectionDto {
  surveyId: string;
  title: string;
  description?: string;
  order?: number;
}
