import { Response, NextFunction } from "express";

import { AuthRequest } from "../../../shared/middleware/auth.middleware";

import { ForbiddenError } from "../../../shared/exceptions/ForbiddenError";

import { UserModel } from "../../users/models/User.model";

export const permissionMiddleware =
  (...permissions: string[]) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.user?.userId).populate({
      path: "roleIds",
      populate: {
        path: "permissions",
      },
    });

    if (!user) {
      throw new ForbiddenError("User not found");
    }

    const userPermissions = (user.roleIds as any[]).flatMap((role) =>
      role.permissions.map((permission: any) => permission.name),
    );

    const hasPermission = permissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenError("Permission denied");
    }

    next();
  };
