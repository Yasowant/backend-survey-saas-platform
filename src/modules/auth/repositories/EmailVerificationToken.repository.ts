import { EmailVerificationTokenModel } from "../models/EmailVerificationToken.model";

export class EmailVerificationTokenRepository {
  async create(userId: string, token: string, expiresAt: Date) {
    return EmailVerificationTokenModel.create({
      userId,
      token,
      expiresAt,
    });
  }

  async findByToken(token: string) {
    return EmailVerificationTokenModel.findOne({
      token,
    });
  }

  async deleteByToken(token: string) {
    return EmailVerificationTokenModel.deleteOne({
      token,
    });
  }
}
