import { SurveyModel } from "../models/Survey.model";
import { UpdateSurveyDto } from "../dto/UpdateSurvey.dto";

export class SurveyRepository {
  async create(data: any) {
    return SurveyModel.create(data);
  }

  async findById(id: string) {
    return SurveyModel.findById(id).populate("createdBy");
  }

  async getAll() {
    return SurveyModel.find().populate("createdBy");
  }

  async update(id: string, data: UpdateSurveyDto) {
    return SurveyModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return SurveyModel.findByIdAndDelete(id);
  }
}
