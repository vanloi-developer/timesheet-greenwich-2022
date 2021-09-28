import { BaseService } from "./base";

import { RoleRepository } from "../../dataAccess/repositories";
import { CreateRoleDto } from "../dto/requests/role/CreateRoleDto";
import { ApiError } from "../core";
class RoleService extends BaseService<RoleRepository> {
  constructor() {
    super(new RoleRepository());
  }

  public create = async (item: CreateRoleDto) => {
    try {
      return await this._repos.save(item);
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };

  public getAll = async (query: {
    keyword: string;
    skipCount: number;
    maxResultCount: number;
  }) => {
    try {
      return await this._repos.getAll(query);
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };

  public delete = async (id: number) => {
    try {
      return await this._repos.delete(id);
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };
}

Object.seal(RoleService);
export { RoleService };
