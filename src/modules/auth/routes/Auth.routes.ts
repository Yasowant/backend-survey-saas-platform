import { Router } from "express";

import { AuthController } from "../controllers/Auth.controller";

import { asyncHandler } from "../../../shared/middleware/asyncHandler";

const router = Router();

const authController = new AuthController();

router.post("/register", asyncHandler(authController.register));
router.get("/verify-email", asyncHandler(authController.verifyEmail));
router.post("/login", asyncHandler(authController.login));
router.post("/refresh-token", asyncHandler(authController.refreshToken));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.post("/reset-password", asyncHandler(authController.resetPassword));
router.post("/logout", asyncHandler(authController.logout));

export default router;
