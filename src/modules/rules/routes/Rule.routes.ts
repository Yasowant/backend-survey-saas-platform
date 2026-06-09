import { Router } from "express";
import { RuleController } from "../controllers/Rule.controller";
import { asyncHandler } from "../../../shared/middleware/asyncHandler";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const ruleController = new RuleController();

router.get("/", authMiddleware, asyncHandler(ruleController.getRules));
router.get(
  "/survey/:surveyId",
  authMiddleware,
  asyncHandler(ruleController.getSurveyRules),
);
router.get("/:id", authMiddleware, asyncHandler(ruleController.getRuleById));
router.post("/", authMiddleware, asyncHandler(ruleController.createRule));
router.put("/:id", authMiddleware, asyncHandler(ruleController.updateRule));
router.delete("/:id", authMiddleware, asyncHandler(ruleController.deleteRule));

export default router;
