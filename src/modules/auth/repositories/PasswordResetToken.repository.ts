import { PasswordResetTokenModel } from "../models/PasswordResetToken.model";

export class PasswordResetTokenRepository {
  async create(userId: string, token: string, expiresAt: Date) {
    return PasswordResetTokenModel.create({
      userId,
      token,
      expiresAt,
    });
  }

  async findByToken(token: string) {
    return PasswordResetTokenModel.findOne({
      token,
    });
  }

  async deleteByToken(token: string) {
    return PasswordResetTokenModel.deleteOne({
      token,
    });
  }
}
