import { Request, Response } from "express";

import { RoleService } from "../services/Role.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";
import { AuthRequest } from "../../../shared/middleware/auth.middleware";

export class RoleController {
  private readonly roleService = new RoleService();

  getRoles = async (req: Request, res: Response) => {
    const roles = await this.roleService.getRoles();

    return res.json(new ApiResponse(true, "Roles fetched successfully", roles));
  };

  getRoleById = async (req: Request, res: Response) => {
    const role = await this.roleService.getRoleById(req.params.id as string);

    return res.json(new ApiResponse(true, "Role fetched successfully", role));
  };

  createRole = async (req: AuthRequest, res: Response) => {
    const role = await this.roleService.createRole(req.body, req.user!.userId);

    return res
      .status(201)
      .json(new ApiResponse(true, "Role created successfully", role));
  };

  getRolePermissions = async (req: Request, res: Response) => {
    const role = await this.roleService.getRoleById(req.params.id as string);

    return res.json(
      new ApiResponse(
        true,
        "Role permissions fetched successfully",
        role.permissions,
      ),
    );
  };

  updateRole = async (req: AuthRequest, res: Response) => {
    const role = await this.roleService.updateRole(
      req.params.id as string,
      req.body,
      req.user!.userId,
    );

    return res.json(new ApiResponse(true, "Role updated successfully", role));
  };
  deleteRole = async (req: AuthRequest, res: Response) => {
    await this.roleService.deleteRole(
      req.params.id as string,
      req.user!.userId,
    );

    return res.json(new ApiResponse(true, "Role deleted successfully", null));
  };
}
