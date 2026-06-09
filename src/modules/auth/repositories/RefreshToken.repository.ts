import { RefreshTokenModel } from "../models/RefreshToken.model";

export class RefreshTokenRepository {
  async create(userId: string, token: string, expiresAt: Date) {
    return RefreshTokenModel.create({
      userId,
      token,
      expiresAt,
    });
  }

  async findByToken(token: string) {
    return RefreshTokenModel.findOne({
      token,
    });
  }

  async deleteByToken(token: string) {
    return RefreshTokenModel.deleteOne({
      token,
    });
  }

  async deleteByUserId(userId: string) {
    return RefreshTokenModel.deleteMany({
      userId,
    });
  }
}
