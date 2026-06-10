import { NextFunction, Response } from "express";

import { AuthRequest } from "./auth.middleware";

import { UserModel } from "../../modules/users/models/User.model";
import { RoleModel } from "../../modules/roles/models/Role.model";

export const permissionMiddleware =
  (requiredPermission: string) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      const roles = await RoleModel.find({
        _id: {
          $in: user.roleIds,
        },
      }).populate("permissions");

      const permissions = roles.flatMap((role: any) =>
        role.permissions.map((permission: any) => permission.name),
      );

      const hasPermission = permissions.includes(requiredPermission);

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "Permission denied",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
