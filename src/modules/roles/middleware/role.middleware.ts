import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../shared/middleware/auth.middleware";
import { ForbiddenError } from "../../../shared/exceptions/ForbiddenError";
import { UserModel } from "../../users/models/User.model";

export const roleMiddleware =
  (...roles: string[]) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.user?.userId).populate("roleIds");

    if (!user) {
      throw new ForbiddenError("User not found");
    }

    const hasRole = user.roleIds.some((role: any) => roles.includes(role.name));

    if (!hasRole) {
      throw new ForbiddenError("Access denied");
    }

    next();
  };
