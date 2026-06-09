export interface UpdateSurveyDto {
  title?: string;
  description?: string;
  status?: "DRAFT" | "PUBLISHED" | "CLOSED";
  startDate?: Date;
  endDate?: Date;
}
