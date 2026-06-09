import { CreateSurveyDto } from "../dto/CreateSurvey.dto";
import { UpdateSurveyDto } from "../dto/UpdateSurvey.dto";

export interface ISurveyReposistory {
  create(data: CreateSurveyDto): Promise<any>;
  findById(id: string): Promise<any>;
  getAll(): Promise<any[]>;
  update(id: string, data: UpdateSurveyDto): Promise<any>;
  delete(id: string): Promise<any>;
}
