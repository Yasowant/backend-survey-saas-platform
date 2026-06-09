import { Router } from "express";

import { UserController } from "../controllers/User.controller";

import { asyncHandler } from "../../../shared/middleware/asyncHandler";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const userController = new UserController();

router.get("/", asyncHandler(userController.getUsers));
router.get("/me", authMiddleware, asyncHandler(userController.getProfile));
router.get("/:id", asyncHandler(userController.getUserById));
router.post("/:userId/roles", asyncHandler(userController.assignRoles));
router.get("/:userId/roles", asyncHandler(userController.getUserRoles));
router.delete(
  "/:userId/roles/:roleId",
  asyncHandler(userController.removeRole),
);

export default router;
