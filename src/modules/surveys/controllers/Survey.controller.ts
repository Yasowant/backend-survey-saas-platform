import { Response } from "express";

import { SurveyService } from "../services/Survey.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";

import { AuthRequest } from "../../../shared/middleware/auth.middleware";

export class SurveyController {
  private readonly surveyService = new SurveyService();

  getSurveys = async (req: AuthRequest, res: Response) => {
    const surveys = await this.surveyService.getSurveys();

    return res.json(
      new ApiResponse(true, "Surveys fetched successfully", surveys),
    );
  };

  getSurveyById = async (req: AuthRequest, res: Response) => {
    const survey = await this.surveyService.getSurveyById(
      req.params.id as string,
    );

    return res.json(
      new ApiResponse(true, "Survey fetched successfully", survey),
    );
  };

  createSurvey = async (req: AuthRequest, res: Response) => {
    const survey = await this.surveyService.createSurvey(
      req.body,
      req.user!.userId,
    );

    return res
      .status(201)
      .json(new ApiResponse(true, "Survey created successfully", survey));
  };

  updateSurvey = async (req: AuthRequest, res: Response) => {
    const survey = await this.surveyService.updateSurvey(
      req.params.id as string,
      req.body,
    );

    return res.json(
      new ApiResponse(true, "Survey updated successfully", survey),
    );
  };

  deleteSurvey = async (req: AuthRequest, res: Response) => {
    await this.surveyService.deleteSurvey(req.params.id as string);
    return res.json(new ApiResponse(true, "Survey deleted successfully", null));
  };

  getSurveyDetails = async (req: AuthRequest, res: Response) => {
    const survey = await this.surveyService.getSurveyDetails(
      req.params.id as string,
    );
    return res.json(
      new ApiResponse(true, "Survey details fetched successfully", survey),
    );
  };
}
