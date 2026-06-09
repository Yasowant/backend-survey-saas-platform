export interface UpdateQuestionDto {
  title?: string;
  description?: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  order?: number;
}
