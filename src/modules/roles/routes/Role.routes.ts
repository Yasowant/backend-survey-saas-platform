import { Router } from "express";

import { RoleController } from "../controllers/Role.controller";

import { asyncHandler } from "../../../shared/middleware/asyncHandler";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const roleController = new RoleController();
router.get("/", asyncHandler(roleController.getRoles));
router.get("/:id/permissions", asyncHandler(roleController.getRolePermissions));
router.get("/:id", asyncHandler(roleController.getRoleById));
router.post("/", authMiddleware, asyncHandler(roleController.createRole));
router.put("/:id", authMiddleware, asyncHandler(roleController.updateRole));
router.delete("/:id", authMiddleware, asyncHandler(roleController.deleteRole));

export default router;
