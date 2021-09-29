import { UserModel } from "../../models";
import { UserRepository } from "../../dataAccess/repositories";
import { CreateUserDTO } from "../dto/requests";
import { BaseService } from "./base";
import { ApiError } from "../core";
import { HttpStatusCode } from "../enums";
import { UserDTO } from "../dto/common/UserDto";
import { IUser } from "../../interfaces";
import { GridParam } from "../dto/requests/GridParam";

class UserService extends BaseService<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  public create = async (user: CreateUserDTO) => {
    try {
      const isExist = await this._repos.findByUsername(user.userName);

      if (isExist) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          `username is already exist, try again`
        );
      }

      const result = await this._repos.save(user);

      return result;
    } catch (error) {
      throw error;
    }
  };

  public getUserNotPagging = async () => {
    try {
      return await this._repos.getUserNotPagging();
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };

  public getAllManager = async () => {
    try {
      return await this._repos.getAllManager();
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };

  public getAllPagging = async (filter: GridParam) => {
    try {
      return await this._repos.getAllPagging(filter);
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };
}

Object.seal(UserService);
export { UserService };
