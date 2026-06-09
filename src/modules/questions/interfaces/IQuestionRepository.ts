import { CreateQuestionDto } from "../dto/CreateQuestion.dto";
import { UpdateQuestionDto } from "../dto/UpdateQuestion.dto";

export interface IQuestionRepository {
  create(data: CreateQuestionDto): Promise<any>;
  findById(id: string): Promise<any>;
  findBySectionId(sectionId: string): Promise<any>;
  update(id: string, data: UpdateQuestionDto): Promise<any>;
  delete(id: string): Promise<any>;
}
