import { CreateUserDto } from "../dto/CreateUser.dto";

export interface IUserRepository {
  create(data: CreateUserDto): Promise<any>;
  findById(id: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
  getAll(): Promise<any[]>;
}
