import crypto from "crypto";
import { UserRepository } from "../../users/repositories/User.repository";
import { PasswordService } from "./Password.service";
import { TokenService } from "./Token.service";
import { env } from "../../../config/env";
import { ConflictError } from "../../../shared/exceptions/ConflictError";
import { UnauthorizedError } from "../../../shared/exceptions/UnauthorizedError";
import { RefreshTokenRepository } from "../repositories/RefreshToken.repository";
import { MailService } from "./Mail.service";
import { EmailVerificationTokenRepository } from "../repositories/EmailVerificationToken.repository";
import { PasswordResetTokenRepository } from "../repositories/PasswordResetToken.repository";

export class AuthService {
  private readonly userRepository = new UserRepository();
  private readonly passwordService = new PasswordService();
  private readonly tokenService = new TokenService();
  private readonly refreshTokenRepository = new RefreshTokenRepository();
  private readonly mailService = new MailService();
  private readonly emailVerificationTokenRepository =
    new EmailVerificationTokenRepository();
  private readonly passwordResetTokenRepository =
    new PasswordResetTokenRepository();

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const verificationToken = crypto.randomUUID();

    await this.emailVerificationTokenRepository.create(
      user._id.toString(),
      verificationToken,
      new Date(Date.now() + 24 * 60 * 60 * 1000),
    );

    const verificationUrl = `${env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    // Send email in background (don't block response)
    this.mailService
      .sendEmail(
        user.email,
        "Verify Your Email",
        `
      <div style="font-family: Arial, sans-serif;">
        <h2>Welcome ${user.firstName} 👋</h2>

        <p>Thank you for registering.</p>

        <p>Please click the button below to verify your email address:</p>

        <a
          href="${verificationUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#2563eb;
            color:#ffffff;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Verify Email
        </a>

        <p style="margin-top:20px;">
          This link will expire in 24 hours.
        </p>
      </div>
      `,
      )
      .catch((error) => {
        console.error("Email sending failed:", error);
      });

    return {
      user,
      message:
        "Registration successful. Please check your email to verify your account.",
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedError("Please verify your email first");
    }
    const isPasswordValid = await this.passwordService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }
    const accessToken = this.tokenService.generateAccessToken({
      userId: user._id,
      email: user.email,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      userId: user._id,
    });

    await this.refreshTokenRepository.create(
      user._id.toString(),
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const existingToken =
      await this.refreshTokenRepository.findByToken(refreshToken);

    if (!existingToken) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const decoded = this.tokenService.verifyRefreshToken(refreshToken) as {
      userId: string;
    };

    const accessToken = this.tokenService.generateAccessToken({
      userId: decoded.userId,
    });

    return {
      accessToken,
    };
  }

  async logout(refreshToken: string) {
    await this.refreshTokenRepository.deleteByToken(refreshToken);
  }

  async verifyEmail(token: string) {
    const tokenDoc =
      await this.emailVerificationTokenRepository.findByToken(token);

    if (!tokenDoc) {
      return {
        alreadyVerified: true,
        message: "Email already verified. Please sign in.",
      };
    }

    const user = await this.userRepository.findById(tokenDoc.userId.toString());

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    if (user.isEmailVerified) {
      return {
        alreadyVerified: true,
        message: "Email already verified. Please sign in.",
      };
    }

    await this.userRepository.update(tokenDoc.userId.toString(), {
      isEmailVerified: true,
    });

    await this.emailVerificationTokenRepository.deleteByToken(token);

    return {
      alreadyVerified: false,
      message: "Email verified successfully",
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return true;
    }

    const token = crypto.randomUUID();

    await this.passwordResetTokenRepository.create(
      user._id.toString(),
      token,
      new Date(Date.now() + 60 * 60 * 1000),
    );

    const resetUrl = `${env.CLIENT_URL}/reset-password?token=${token}`;

    await this.mailService.sendEmail(
      user.email,
      "Reset Password",
      `
      <h2>Reset Password</h2>

      <p>Click below link:</p>

      <a href="${resetUrl}">
        Reset Password
      </a>
    `,
    );

    return true;
  }
  async resetPassword(token: string, password: string) {
    const tokenDoc = await this.passwordResetTokenRepository.findByToken(token);

    if (!tokenDoc) {
      throw new UnauthorizedError("Invalid reset token");
    }

    const hashedPassword = await this.passwordService.hash(password);

    await this.userRepository.update(tokenDoc.userId.toString(), {
      password: hashedPassword,
    });

    await this.passwordResetTokenRepository.deleteByToken(token);

    return true;
  }
}
