import { SectionModel } from "../models/Section.model";

import { CreateSectionDto } from "../dto/CreateSection.dto";
import { UpdateSectionDto } from "../dto/UpdateSection.dto";

export class SectionRepository {
  async create(data: CreateSectionDto) {
    return SectionModel.create(data);
  }

  async findById(id: string) {
    return SectionModel.findById(id);
  }

  async findBySurveyId(surveyId: string) {
    return SectionModel.find({
      surveyId,
    }).sort({
      order: 1,
    });
  }

  async update(id: string, data: UpdateSectionDto) {
    return SectionModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return SectionModel.findByIdAndDelete(id);
  }
}
