import { Response } from "express";

import { ResponseService } from "../services/Response.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";

import { AuthRequest } from "../../../shared/middleware/auth.middleware";

export class ResponseController {
  private readonly responseService = new ResponseService();

  submitResponse = async (req: AuthRequest, res: Response) => {
    const response = await this.responseService.submitResponse(
      req.body,
      req.user?.userId,
    );

    return res
      .status(201)
      .json(new ApiResponse(true, "Response submitted successfully", response));
  };

  getResponses = async (req: AuthRequest, res: Response) => {
    const responses = await this.responseService.getResponses();

    return res.json(
      new ApiResponse(true, "Responses fetched successfully", responses),
    );
  };

  getResponseById = async (req: AuthRequest, res: Response) => {
    const response = await this.responseService.getResponseById(
      req.params.id as string,
    );

    return res.json(
      new ApiResponse(true, "Response fetched successfully", response),
    );
  };

  getSurveyResponses = async (req: AuthRequest, res: Response) => {
    const responses = await this.responseService.getSurveyResponses(
      req.params.surveyId as string,
    );

    return res.json(
      new ApiResponse(true, "Survey responses fetched successfully", responses),
    );
  };

  deleteResponse = async (req: AuthRequest, res: Response) => {
    await this.responseService.deleteResponse(req.params.id as string);

    return res.json(
      new ApiResponse(true, "Response deleted successfully", null),
    );
  };
}
