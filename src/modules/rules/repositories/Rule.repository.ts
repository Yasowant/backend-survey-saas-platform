import { CreateRuleDto } from "../dto/CreateRule.dto";
import { UpdateRuleDto } from "../dto/UpdateRule.dto";
import { RuleModel } from "../models/Rules.model";

export class RuleRepository {
  async create(data: CreateRuleDto) {
    return RuleModel.create(data);
  }

  async findById(id: string) {
    return RuleModel.findById(id);
  }

  async findBySurveyId(surveyId: string) {
    return RuleModel.find({
      surveyId,
    }).sort({
      order: 1,
    });
  }

  async getAll() {
    return RuleModel.find();
  }

  async update(id: string, data: UpdateRuleDto) {
    return RuleModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return RuleModel.findByIdAndDelete(id);
  }

  async deleteBySurveyId(surveyId: string) {
    return RuleModel.deleteMany({ surveyId });
  }
}
