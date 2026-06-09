import { AuditLogRepository } from "../repositories/AuditLog.repository";

export class AuditLogService {
  constructor(private readonly auditLogRepository = new AuditLogRepository()) {}

  async createAuditLog(data: any) {
    return this.auditLogRepository.create(data);
  }

  async getAuditLogs(filters: any) {
    return this.auditLogRepository.getAll(filters);
  }
}
