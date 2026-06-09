import { ResponseModel } from "../models/Response.model";

export class ResponseRepository {
  async create(data: any) {
    return ResponseModel.create(data);
  }

  async findById(id: string) {
    return ResponseModel.findById(id)
      .populate("surveyId", "title")
      .populate("submittedBy", "firstName lastName")
      .populate("answers.questionId", "title");
  }

  async findBySurveyId(surveyId: string) {
    return ResponseModel.find({
      surveyId,
    })
      .populate("surveyId", "title")
      .populate("submittedBy", "firstName lastName")
      .populate("answers.questionId", "title");
  }

  async getAll() {
    return ResponseModel.find()
      .populate("surveyId", "title")
      .populate("submittedBy", "firstName lastName")
      .populate("answers.questionId", "title");
  }

  async delete(id: string) {
    return ResponseModel.findByIdAndDelete(id);
  }
}
