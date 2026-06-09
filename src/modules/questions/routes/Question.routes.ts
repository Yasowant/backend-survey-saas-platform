import { Router } from "express";

import { QuestionController } from "../controllers/Question.controller";

import { asyncHandler } from "../../../shared/middleware/asyncHandler";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const questionController = new QuestionController();

router.get(
  "/section/:sectionId",
  authMiddleware,
  asyncHandler(questionController.getQuestions),
);

router.get(
  "/:id",
  authMiddleware,
  asyncHandler(questionController.getQuestionById),
);

router.post(
  "/",
  authMiddleware,
  asyncHandler(questionController.createQuestion),
);

router.put(
  "/:id",
  authMiddleware,
  asyncHandler(questionController.updateQuestion),
);

router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(questionController.deleteQuestion),
);

export default router;
