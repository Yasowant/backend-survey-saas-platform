import { RoleRepository } from "../repositories/Role.repository";

import { CreateRoleDto } from "../dto/CreateRole.dto";

import { NotFoundError } from "../../../shared/exceptions/NotFoundError";

import { ConflictError } from "../../../shared/exceptions/ConflictError";
import { UpdateRoleDto } from "../dto/UpdateRole.dto";
import { AuditLogService } from "../../audit-logs/services/AuditLog.service";

export class RoleService {
  constructor(
    private readonly roleRepository = new RoleRepository(),
    private readonly auditLogService = new AuditLogService(),
  ) {}

  async getRoles() {
    return this.roleRepository.getAll();
  }

  async getRoleById(id: string) {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new NotFoundError("Role not found");
    }

    return role;
  }

  async createRole(data: CreateRoleDto, userId: string) {
    const existingRole = await this.roleRepository.findByName(data.name);

    if (existingRole) {
      throw new ConflictError("Role already exists");
    }

    const role = await this.roleRepository.create(data);

    await this.auditLogService.createAuditLog({
      userId,
      action: "ROLE_CREATED",
      entityType: "Role",
      entityId: role._id,
      oldValue: null,
      newValue: role,
    });

    return role;
  }

  async updateRole(id: string, data: UpdateRoleDto, userId: string) {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new NotFoundError("Role not found");
    }

    const oldValue = role.toObject();

    const updatedRole = await this.roleRepository.update(id, data);

    await this.auditLogService.createAuditLog({
      userId,
      action: "ROLE_UPDATED",
      entityType: "Role",
      entityId: id,
      oldValue,
      newValue: updatedRole,
    });

    return updatedRole;
  }
  async deleteRole(id: string, userId: string) {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new NotFoundError("Role not found");
    }

    await this.roleRepository.delete(id);

    await this.auditLogService.createAuditLog({
      userId,
      action: "ROLE_DELETED",
      entityType: "Role",
      entityId: id,
      oldValue: role,
      newValue: null,
    });

    return null;
  }
}
