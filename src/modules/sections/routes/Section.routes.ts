import { Router } from "express";

import { SectionController } from "../controllers/Section.controller";

import { asyncHandler } from "../../../shared/middleware/asyncHandler";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const sectionController = new SectionController();

router.get(
  "/survey/:surveyId",
  authMiddleware,
  asyncHandler(sectionController.getSections),
);

router.get(
  "/:id",
  authMiddleware,
  asyncHandler(sectionController.getSectionById),
);

router.post("/", authMiddleware, asyncHandler(sectionController.createSection));

router.put(
  "/:id",
  authMiddleware,
  asyncHandler(sectionController.updateSection),
);

router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(sectionController.deleteSection),
);

export default router;
