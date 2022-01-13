import { ApiError } from "../core";

import { BaseService } from "./base";

import { HttpStatusCode } from "../enums";

import { PagedResultRoleDto } from "../dto/responses";

import { RoleRepository } from "../../dataAccess/repositories";

import { CreateRoleDto } from "../dto/requests/role/CreateRoleDto";

class RoleService extends BaseService<RoleRepository> {
  constructor() {
    super(new RoleRepository());
  }

  public create = async (item: CreateRoleDto): Promise<CreateRoleDto> => {
    try {
      return await this._repos.save(item);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };

  public getAll = async (query: {
    keyword: string;
    skipCount: number;
    maxResultCount: number;
  }): Promise<PagedResultRoleDto> => {
    try {
      return await this._repos.getAll(query);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };

  public delete = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.delete(id);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };
}

Object.seal(RoleService);
export { RoleService };
