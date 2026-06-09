import { Router } from "express";
import { DashboardController } from "../controllers/Dashboard.controller";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { asyncHandler } from "../../../shared/middleware/asyncHandler";

const router = Router();

const controller = new DashboardController();

router.get("/", authMiddleware, asyncHandler(controller.getDashboard));

export default router;
