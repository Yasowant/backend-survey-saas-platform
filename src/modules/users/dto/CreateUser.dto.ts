import { Types } from "mongoose";

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleIds?: Types.ObjectId[];
}
