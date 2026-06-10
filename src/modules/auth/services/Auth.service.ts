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

    const html = `
  <div style="margin:0;padding:0;background:#f4f7fb;font-family:Inter,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 20px;">

          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#ffffff;
              border-radius:16px;
              overflow:hidden;
              box-shadow:0 10px 30px rgba(0,0,0,0.08);
            "
          >

            <!-- Header -->
            <tr>
              <td
                align="center"
                style="
                  background:linear-gradient(135deg,#2563eb,#4f46e5);
                  padding:40px 30px;
                "
              >
                <h1
                  style="
                    color:#ffffff;
                    margin:0;
                    font-size:34px;
                    font-weight:700;
                  "
                >
                  Survesy
                </h1>

                <p
                  style="
                    color:#dbeafe;
                    margin-top:10px;
                    font-size:15px;
                  "
                >
                  Build better surveys. Collect better insights.
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;">

                <h2
                  style="
                    color:#111827;
                    margin-top:0;
                    font-size:28px;
                  "
                >
                  Welcome ${user.firstName} 👋
                </h2>

                <p
                  style="
                    color:#4b5563;
                    line-height:1.8;
                    font-size:16px;
                  "
                >
                  Thank you for joining <strong>Survesy</strong>.
                  Your account has been successfully created.
                </p>

                <p
                  style="
                    color:#4b5563;
                    line-height:1.8;
                    font-size:16px;
                  "
                >
                  To activate your account and start creating powerful surveys,
                  please verify your email address.
                </p>

                <div
                  style="
                    text-align:center;
                    margin:40px 0;
                  "
                >
                  <a
                    href="${verificationUrl}"
                    style="
                      display:inline-block;
                      background:#2563eb;
                      color:#ffffff;
                      text-decoration:none;
                      padding:14px 32px;
                      border-radius:10px;
                      font-size:16px;
                      font-weight:600;
                    "
                  >
                    Verify Email Address
                  </a>
                </div>

                <p
                  style="
                    color:#6b7280;
                    font-size:14px;
                  "
                >
                  This verification link will expire in 24 hours.
                </p>

                <div
                  style="
                    margin-top:30px;
                    padding:16px;
                    background:#f9fafb;
                    border-radius:8px;
                    border:1px solid #e5e7eb;
                  "
                >
                  <p
                    style="
                      margin:0;
                      color:#6b7280;
                      font-size:13px;
                      word-break:break-all;
                    "
                  >
                    If the button doesn't work, copy and paste this link:
                  </p>

                  <p
                    style="
                      margin-top:10px;
                      color:#2563eb;
                      font-size:13px;
                    "
                  >
                    ${verificationUrl}
                  </p>
                </div>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background:#f9fafb;
                  padding:25px;
                  text-align:center;
                  border-top:1px solid #e5e7eb;
                "
              >
                <p
                  style="
                    margin:0;
                    color:#6b7280;
                    font-size:13px;
                  "
                >
                  © ${new Date().getFullYear()} Survesy. All rights reserved.
                </p>

                <p
                  style="
                    margin-top:8px;
                    color:#9ca3af;
                    font-size:12px;
                  "
                >
                  If you didn't create this account, you can safely ignore this email.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
  `;

    this.mailService
      .sendEmail(user.email, "🎉 Welcome to Survesy - Verify Your Email", html)
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
