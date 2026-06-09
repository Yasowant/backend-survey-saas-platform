import { Router } from "express";

import { AuditLogController } from "../controllers/AuditLog.controller";

import { asyncHandler } from "../../../shared/middleware/asyncHandler";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const auditLogController = new AuditLogController();

router.get("/", authMiddleware, asyncHandler(auditLogController.getAuditLogs));

export default router;
