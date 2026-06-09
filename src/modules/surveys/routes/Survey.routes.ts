import { Router } from "express";

import { SurveyController } from "../controllers/Survey.controller";
import { asyncHandler } from "../../../shared/middleware/asyncHandler";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const surveyController = new SurveyController();

router.get("/", authMiddleware, asyncHandler(surveyController.getSurveys));
router.get(
  "/:id",
  authMiddleware,
  asyncHandler(surveyController.getSurveyById),
);
router.post("/", authMiddleware, asyncHandler(surveyController.createSurvey));
router.put("/:id", authMiddleware, asyncHandler(surveyController.updateSurvey));
router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(surveyController.deleteSurvey),
);
router.get(
  "/:id/details",
  authMiddleware,
  asyncHandler(surveyController.getSurveyDetails),
);

export default router;
