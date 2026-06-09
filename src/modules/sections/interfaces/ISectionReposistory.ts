import { CreateSectionDto } from "../dto/CreateSection.dto";
import { UpdateSectionDto } from "../dto/UpdateSection.dto";

export interface ISectionReposistory {
  create(data: CreateSectionDto): Promise<any>;
  findById(id: string): Promise<any>;
  findBySurveyId(surveyId: string): Promise<any>;
  update(id: string, data: UpdateSectionDto): Promise<any>;
  delete(id: string): Promise<any>;
}
