import { UserRepository } from "../repositories/User.repository";

import { NotFoundError } from "../../../shared/exceptions/NotFoundError";

export class UserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async getAllUsers() {
    return this.userRepository.getAll();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async assignRoles(userId: string, roleIds: string[]) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.userRepository.assignRoles(userId, roleIds);
  }

  async getUserRoles(userId: string) {
    const user = await this.userRepository.getUserRoles(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user.roleIds;
  }

  async removeRole(userId: string, roleId: string) {
    return this.userRepository.removeRole(userId, roleId);
  }
}
