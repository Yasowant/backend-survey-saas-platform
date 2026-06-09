import { Request, Response } from "express";

import { PermissionService } from "../services/Permission.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";

export class PermissionController {
  private readonly permissionService = new PermissionService();

  getPermissions = async (req: Request, res: Response) => {
    const permissions = await this.permissionService.getPermissions();

    return res.json(
      new ApiResponse(true, "Permissions fetched successfully", permissions),
    );
  };

  getPermissionById = async (req: Request, res: Response) => {
    const permission = await this.permissionService.getPermissionById(
      req.params.id as string,
    );

    return res.json(
      new ApiResponse(true, "Permission fetched successfully", permission),
    );
  };

  createPermission = async (req: Request, res: Response) => {
    const permission = await this.permissionService.createPermission(req.body);

    return res
      .status(201)
      .json(
        new ApiResponse(true, "Permission created successfully", permission),
      );
  };

  updatePermission = async (req: Request, res: Response) => {
    const permission = await this.permissionService.updatePermission(
      req.params.id as string,
      req.body,
    );

    return res.json(
      new ApiResponse(true, "Permission updated successfully", permission),
    );
  };

  deletePermission = async (req: Request, res: Response) => {
    await this.permissionService.deletePermission(req.params.id as string);

    return res.json(new ApiResponse(true, "Permission deleted successfully"));
  };
}
