import { CreateRoleDto } from "../dto/CreateRole.dto";
import { UpdateRoleDto } from "../dto/UpdateRole.dto";

import { RoleModel } from "../models/Role.model";

export class RoleRepository {
  async create(data: CreateRoleDto) {
    return RoleModel.create(data);
  }

  async findById(id: string) {
    return RoleModel.findById(id).populate("permissions");
  }

  async findByName(name: string) {
    return RoleModel.findOne({
      name,
    });
  }

  async getAll() {
    return RoleModel.find().populate("permissions");
  }

  async update(id: string, data: UpdateRoleDto) {
    return RoleModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("permissions");
  }

  async delete(id: string) {
    return RoleModel.findByIdAndDelete(id);
  }
}
