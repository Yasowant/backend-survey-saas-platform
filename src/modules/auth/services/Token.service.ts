import jwt from "jsonwebtoken";

export class TokenService {
  generateAccessToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });
  }

  generateRefreshToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  }
}
