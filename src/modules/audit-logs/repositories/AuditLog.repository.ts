import { AuditLogModel } from "../models/AuditLog.model";

export class AuditLogRepository {
  async create(data: any) {
    return AuditLogModel.create(data);
  }

  async getAll(filters: any = {}) {
    return AuditLogModel.find(filters).populate("userId").sort({
      createdAt: -1,
    });
  }
}
