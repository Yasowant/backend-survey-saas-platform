import { QuestionRepository } from "../repositories/Question.repository";

import { NotFoundError } from "../../../shared/exceptions/NotFoundError";

export class QuestionService {
  constructor(private readonly questionRepository = new QuestionRepository()) {}

  async createQuestion(data: any) {
    return this.questionRepository.create(data);
  }

  async getQuestions(sectionId: string) {
    return this.questionRepository.findBySectionId(sectionId);
  }

  async getQuestionById(id: string) {
    const question = await this.questionRepository.findById(id);

    if (!question) {
      throw new NotFoundError("Question not found");
    }

    return question;
  }

  async updateQuestion(id: string, data: any) {
    const question = await this.questionRepository.findById(id);

    if (!question) {
      throw new NotFoundError("Question not found");
    }

    return this.questionRepository.update(id, data);
  }

  async deleteQuestion(id: string) {
    const question = await this.questionRepository.findById(id);

    if (!question) {
      throw new NotFoundError("Question not found");
    }

    await this.questionRepository.delete(id);

    return null;
  }
}
