import { Router } from "express";

import { AnalyticsController } from "../controllers/Analytics.controller";

import { asyncHandler } from "../../../shared/middleware/asyncHandler";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const analyticsController = new AnalyticsController();

router.get(
  "/dashboard",
  authMiddleware,
  asyncHandler(analyticsController.getDashboardAnalytics),
);

router.get(
  "/survey/:surveyId",
  authMiddleware,
  asyncHandler(analyticsController.getSurveyAnalytics),
);

export default router;
