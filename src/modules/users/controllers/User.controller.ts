import { Request, Response } from "express";

import { UserService } from "../services/User.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";
import { AuthRequest } from "../../../shared/middleware/auth.middleware";

export class UserController {
  private readonly userService = new UserService();

  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();

    return res.json(new ApiResponse(true, "Users fetched successfully", users));
  };

  getUserById = async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(req.params.id as string);

    return res.json(new ApiResponse(true, "User fetched successfully", user));
  };

  getProfile = async (req: AuthRequest, res: Response) => {
    const user = await this.userService.getProfile(req.user!.userId);
    return res.json(
      new ApiResponse(true, "Profile fetched successfully", user),
    );
  };

  assignRoles = async (req: Request, res: Response) => {
    const user = await this.userService.assignRoles(
      req.params.userId as string,
      req.body.roleIds,
    );

    return res.json(new ApiResponse(true, "Roles assigned successfully", user));
  };

  getUserRoles = async (req: Request, res: Response) => {
    const roles = await this.userService.getUserRoles(
      req.params.userId as string,
    );

    return res.json(new ApiResponse(true, "User roles fetched", roles));
  };

  removeRole = async (req: Request, res: Response) => {
    const user = await this.userService.removeRole(
      req.params.userId as string,
      req.params.roleId as string,
    );

    return res.json(new ApiResponse(true, "Role removed successfully", user));
  };
}
