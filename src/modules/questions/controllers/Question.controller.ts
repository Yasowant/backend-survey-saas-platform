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
import { Request, Response } from "express";

import { ApiResponse } from "../../../shared/responses/ApiResponse";

export class QuestionController {
  private readonly questionService = new QuestionService();

  createQuestion = async (req: Request, res: Response) => {
    const question = await this.questionService.createQuestion(req.body);

    return res
      .status(201)
      .json(new ApiResponse(true, "Question created successfully", question));
  };

  getQuestions = async (req: Request, res: Response) => {
    const questions = await this.questionService.getQuestions(
      req.params.sectionId as string,
    );

    return res.json(
      new ApiResponse(true, "Questions fetched successfully", questions),
    );
  };

  getQuestionById = async (req: Request, res: Response) => {
    const question = await this.questionService.getQuestionById(
      req.params.id as string,
    );

    return res.json(
      new ApiResponse(true, "Question fetched successfully", question),
    );
  };

  updateQuestion = async (req: Request, res: Response) => {
    const question = await this.questionService.updateQuestion(
      req.params.id as string,
      req.body,
    );

    return res.json(
      new ApiResponse(true, "Question updated successfully", question),
    );
  };

  deleteQuestion = async (req: Request, res: Response) => {
    await this.questionService.deleteQuestion(req.params.id as string);

    return res.json(
      new ApiResponse(true, "Question deleted successfully", null),
    );
  };
}
