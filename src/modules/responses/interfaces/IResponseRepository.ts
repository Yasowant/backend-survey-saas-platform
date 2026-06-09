import { CreateResponseDto } from "../dto/CreateResponse.dto";

export interface IResponseRepository {
  create(
    data: CreateResponseDto & {
      submittedBy?: string;
    },
  ): Promise<unknown>;

  findById(id: string): Promise<unknown | null>;

  findBySurveyId(surveyId: string): Promise<unknown[]>;

  getAll(): Promise<unknown[]>;

  delete(id: string): Promise<unknown | null>;
}
