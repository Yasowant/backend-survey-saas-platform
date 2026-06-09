import { CreateRuleDto } from "../dto/CreateRule.dto";
import { UpdateRuleDto } from "../dto/UpdateRule.dto";

export interface IRuleRepository {
  create(data: CreateRuleDto): Promise<any>;
  findById(id: string): Promise<any>;
  findBySurveyId(surveyId: string): Promise<any[]>;
  update(id: string, data: UpdateRuleDto): Promise<any>;
  delete(id: string): Promise<any>;
  getAll(): Promise<any[]>;
}
