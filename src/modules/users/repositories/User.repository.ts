import { IUserRepository } from "../interfaces/IUserRepository";

import { CreateUserDto } from "../dto/CreateUser.dto";

import { UserModel } from "../models/User.model";

export class UserRepository implements IUserRepository {
  async create(data: CreateUserDto) {
    return UserModel.create(data);
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async findByEmail(email: string) {
    return UserModel.findOne({
      email,
    }).select("+password");
  }
  async update(id: string, data: Partial<any>) {
    return UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async getAll() {
    return UserModel.find();
  }

  async assignRoles(userId: string, roleIds: string[]) {
    return UserModel.findByIdAndUpdate(
      userId,
      {
        roleIds,
      },
      {
        new: true,
      },
    ).populate("roleIds");
  }

  async getUserRoles(userId: string) {
    return UserModel.findById(userId).populate("roleIds");
  }

  async removeRole(userId: string, roleId: string) {
    return UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          roleIds: roleId,
        },
      },
      {
        new: true,
      },
    ).populate("roleIds");
  }
}
