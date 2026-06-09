import { Request, Response } from "express";

import { AuditLogService } from "../services/AuditLog.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";

export class AuditLogController {
  private readonly auditLogService = new AuditLogService();

  getAuditLogs = async (req: Request, res: Response) => {
    const logs = await this.auditLogService.getAuditLogs(req.query);

    return res.json(
      new ApiResponse(true, "Audit logs fetched successfully", logs),
    );
  };
}
