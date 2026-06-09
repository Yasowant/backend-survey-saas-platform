export interface CreateResponseDto {
  surveyId: string;
  answers: {
    questionId: string;
    value: any;
  }[];
}
