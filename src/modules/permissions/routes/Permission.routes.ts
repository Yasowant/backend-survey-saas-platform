import { Router } from "express";

import { PermissionController } from "../controllers/Permission.controller";

import { asyncHandler } from "../../../shared/middleware/asyncHandler";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

import { permissionMiddleware } from "../../roles/middleware/permission.middleware";

const router = Router();

const permissionController = new PermissionController();

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("PERMISSION_READ"),
  asyncHandler(permissionController.getPermissions),
);

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("PERMISSION_READ"),
  asyncHandler(permissionController.getPermissionById),
);

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("PERMISSION_CREATE"),
  asyncHandler(permissionController.createPermission),
);

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("PERMISSION_UPDATE"),
  asyncHandler(permissionController.updatePermission),
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("PERMISSION_DELETE"),
  asyncHandler(permissionController.deletePermission),
);

export default router;
