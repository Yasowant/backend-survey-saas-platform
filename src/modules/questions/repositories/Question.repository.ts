import { QuestionModel } from "../models/Question.model";

import { CreateQuestionDto } from "../dto/CreateQuestion.dto";

import { UpdateQuestionDto } from "../dto/UpdateQuestion.dto";

export class QuestionRepository {
  async create(data: CreateQuestionDto) {
    return QuestionModel.create(data);
  }

  async findById(id: string) {
    return QuestionModel.findById(id);
  }

  async findBySurveyId(surveyId: string) {
    return QuestionModel.find({
      surveyId,
    }).sort({
      order: 1,
    });
  }

  async findBySectionId(sectionId: string) {
    return QuestionModel.find({
      sectionId,
    }).sort({
      order: 1,
    });
  }

  async update(id: string, data: UpdateQuestionDto) {
    return QuestionModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return QuestionModel.findByIdAndDelete(id);
  }

  async deleteBySurveyId(surveyId: string) {
    return QuestionModel.deleteMany({ surveyId });
  }

  async deleteBySectionId(sectionId: string) {
    return QuestionModel.deleteMany({ sectionId });
  }
}
