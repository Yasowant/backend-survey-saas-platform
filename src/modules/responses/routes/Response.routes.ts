import { Router } from "express";

import { ResponseController } from "../controllers/Response.controller";
import { asyncHandler } from "../../../shared/middleware/asyncHandler";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { permissionMiddleware } from "../../roles/middleware/permission.middleware";

const router = Router();

const responseController = new ResponseController();

router.get("/", authMiddleware, asyncHandler(responseController.getResponses));

router.get(
  "/survey/:surveyId",
  authMiddleware,
  asyncHandler(responseController.getSurveyResponses),
);

router.get(
  "/:id",
  authMiddleware,
  asyncHandler(responseController.getResponseById),
);

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("RESPONSE_CREATE"),
  asyncHandler(responseController.submitResponse),
);

router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(responseController.deleteResponse),
);

export default router;
