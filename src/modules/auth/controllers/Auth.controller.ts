import { Request, Response } from "express";

import { AuthService } from "../services/Auth.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";

export class AuthController {
  private readonly authService = new AuthService();

  register = async (req: Request, res: Response) => {
    const user = await this.authService.register(req.body);

    return res
      .status(201)
      .json(new ApiResponse(true, "User registered successfully", user));
  };

  login = async (req: Request, res: Response) => {
    const result = await this.authService.login(
      req.body.email,
      req.body.password,
    );

    return res.json(new ApiResponse(true, "Login successful", result));
  };

  refreshToken = async (req: Request, res: Response) => {
    const result = await this.authService.refreshToken(req.body.refreshToken);
    return res.json(new ApiResponse(true, "Token refreshed", result));
  };

  logout = async (req: Request, res: Response) => {
    await this.authService.logout(req.body.refreshToken);
    return res.json(new ApiResponse(true, "Logout successfull"));
  };

  verifyEmail = async (req: Request, res: Response) => {
    const result = await this.authService.verifyEmail(
      req.query.token as string,
    );

    return res.json(new ApiResponse(true, result.message, result));
  };

  forgotPassword = async (req: Request, res: Response) => {
    await this.authService.forgotPassword(req.body.email);

    return res.json(new ApiResponse(true, "Password reset email sent"));
  };

  resetPassword = async (req: Request, res: Response) => {
    await this.authService.resetPassword(req.body.token, req.body.password);

    return res.json(new ApiResponse(true, "Password reset successful"));
  };
}
