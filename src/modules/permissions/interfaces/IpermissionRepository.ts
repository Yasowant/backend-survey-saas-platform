import { CreatePermissionDto } from "../dto/CreatePermission.dto";
import { UpdatePermissionDto } from "../dto/UpdatePermission.dto";

export interface IPermissionRepository {
  create(data: CreatePermissionDto): Promise<any>;

  findById(id: string): Promise<any>;

  findByName(name: string): Promise<any>;

  getAll(): Promise<any[]>;

  update(id: string, data: UpdatePermissionDto): Promise<any>;

  delete(id: string): Promise<any>;
}
