import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../exceptions/UnauthorizedError";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Access token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      userId: string;
      email: string;
    };

    req.user = decoded;

    next();
  } catch {
    throw new UnauthorizedError("Invalid token");
  }
};
