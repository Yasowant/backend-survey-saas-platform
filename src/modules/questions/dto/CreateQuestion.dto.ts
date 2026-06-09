export interface CreateQuestionDto {
  surveyId: string;
  sectionId: string;
  title: string;
  description?: string;
  type:
    | "TEXT"
    | "TEXTAREA"
    | "EMAIL"
    | "PHONE"
    | "NUMBER"
    | "DATE"
    | "RADIO"
    | "CHECKBOX"
    | "DROPDOWN"
    | "RATING"
    | "FILE";

  required?: boolean;
  options?: string[];
  placeholder?: string;
  order?: number;
}
