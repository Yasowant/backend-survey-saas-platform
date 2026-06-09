import { Request, Response } from "express";

import { AnalyticsService } from "../services/Analytics.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";

import { ANALYTICS_MESSAGES } from "../constants/Analytics.constants";

export class AnalyticsController {
  private readonly analyticsService = new AnalyticsService();

  getDashboardAnalytics = async (req: Request, res: Response) => {
    const analytics = await this.analyticsService.getDashboardAnalytics();

    return res.json(
      new ApiResponse(true, ANALYTICS_MESSAGES.DASHBOARD_FETCHED, analytics),
    );
  };

  getSurveyAnalytics = async (req: Request, res: Response) => {
    const analytics = await this.analyticsService.getSurveyAnalytics(
      req.params.surveyId as string,
    );

    return res.json(
      new ApiResponse(true, ANALYTICS_MESSAGES.SURVEY_FETCHED, analytics),
    );
  };
}
