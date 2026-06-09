import { PermissionModel } from "../../roles/models/Permission.model";
import { CreatePermissionDto } from "../dto/CreatePermission.dto";
import { UpdatePermissionDto } from "../dto/UpdatePermission.dto";

export class PermissionRepository {
  async create(data: CreatePermissionDto) {
    return PermissionModel.create(data);
  }

  async findById(id: string) {
    return PermissionModel.findById(id);
  }

  async findByName(name: string) {
    return PermissionModel.findOne({
      name,
    });
  }

  async getAll() {
    return PermissionModel.find();
  }

  async update(id: string, data: UpdatePermissionDto) {
    return PermissionModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return PermissionModel.findByIdAndDelete(id);
  }
}
