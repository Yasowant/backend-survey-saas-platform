import { CreateResponseDto } from "../dto/CreateResponse.dto";
import { NotFoundError } from "../../../shared/exceptions/NotFoundError";
import { ResponseRepository } from "../repositories/Response.repository";

export class ResponseService {
  constructor(private readonly responseRepository = new ResponseRepository()) {}

  async submitResponse(data: CreateResponseDto, userId?: string) {
    return this.responseRepository.create({
      ...data,
      submittedBy: userId,
    });
  }

  async getResponses() {
    const responses = await this.responseRepository.getAll();
    return responses.map((response: any) => ({
      id: response._id,
      surveyId: response.surveyId?._id, // add this
      surveyName: response.surveyId?.title,
      submittedBy: response.submittedBy
        ? `${response.submittedBy.firstName} ${response.submittedBy.lastName}`
        : "Anonymous",
      submittedAt: response.createdAt,
      answerCount: response.answers.length,
    }));
  }

  async getResponseById(id: string) {
    const response = await this.responseRepository.findById(id);
    if (!response) {
      throw new NotFoundError("Response not found");
    }
    return response;
  }

  async getSurveyResponses(surveyId: string) {
    const responses = await this.responseRepository.findBySurveyId(surveyId);

    return responses.map((response: any) => ({
      id: response._id,
      surveyId: response.surveyId?._id,
      surveyName: response.surveyId?.title,
      submittedBy: response.submittedBy
        ? `${response.submittedBy.firstName} ${response.submittedBy.lastName}`
        : "Anonymous",

      submittedAt: response.createdAt,
      answers: response.answers.map((answer: any) => ({
        questionId: answer.questionId?._id,
        question: answer.questionId?.title,
        answer: answer.value,
      })),
    }));
  }

  async deleteResponse(id: string) {
    const response = await this.responseRepository.findById(id);
    if (!response) {
      throw new NotFoundError("Response not found");
    }
    await this.responseRepository.delete(id);
    return null;
  }
}
