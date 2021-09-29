import { ApiError } from "../core";

import { BaseService } from "./base";

import { HttpStatusCode } from "../enums";

import { CreateUserDTO } from "../dto/requests";

import { UserDTO } from "../dto/common/UserDto";

import { GridParam } from "../dto/requests/GridParam";

import { GetAllUserDto, GetUserDto } from "../dto/responses";

import { UserRepository } from "../../dataAccess/repositories";

class UserService extends BaseService<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  public create = async (user: CreateUserDTO): Promise<UserDTO> => {
    try {
      const isExist = await this._repos.findByUsername(user.userName);

      if (isExist) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          `username is already exist, try again`
        );
      }

      const result: UserDTO = await this._repos.save(user);

      return result;
    } catch (error) {
      throw error;
    }
  };

  public getUserNotPagging = async (): Promise<GetUserDto[]> => {
    try {
      return await this._repos.getUserNotPagging();
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };

  public getAllManager = async (): Promise<GetUserDto[]> => {
    try {
      return await this._repos.getAllManager();
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };

  public getAllPagging = async (filter: GridParam): Promise<GetAllUserDto> => {
    try {
      return await this._repos.getAllPagging(filter);
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };
}

Object.seal(UserService);
export { UserService };
