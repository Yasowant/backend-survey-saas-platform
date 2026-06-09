import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt: Date | null;
  roleIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
