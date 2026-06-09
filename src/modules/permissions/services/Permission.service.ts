import { PermissionRepository } from "../repositories/Permission.repository";
import { NotFoundError } from "../../../shared/exceptions/NotFoundError";
import { ConflictError } from "../../../shared/exceptions/ConflictError";
import { CreatePermissionDto } from "../dto/CreatePermission.dto";
import { UpdatePermissionDto } from "../dto/UpdatePermission.dto";

export class PermissionService {
  constructor(
    private readonly permissionRepository = new PermissionRepository(),
  ) {}

  async getPermissions() {
    return this.permissionRepository.getAll();
  }

  async getPermissionById(id: string) {
    const permission = await this.permissionRepository.findById(id);

    if (!permission) {
      throw new NotFoundError("Permission not found");
    }

    return permission;
  }

  async createPermission(data: CreatePermissionDto) {
    const existing = await this.permissionRepository.findByName(data.name);

    if (existing) {
      throw new ConflictError("Permission already exists");
    }

    return this.permissionRepository.create(data);
  }

  async updatePermission(id: string, data: UpdatePermissionDto) {
    const permission = await this.permissionRepository.findById(id);

    if (!permission) {
      throw new NotFoundError("Permission not found");
    }

    return this.permissionRepository.update(id, data);
  }

  async deletePermission(id: string) {
    const permission = await this.permissionRepository.findById(id);

    if (!permission) {
      throw new NotFoundError("Permission not found");
    }

    return this.permissionRepository.delete(id);
  }
}
