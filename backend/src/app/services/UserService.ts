
import { UserModel } from "../../models";
import { UserRepository } from "../../dataAccess/repositories";
import { CreateUserDTO } from "../dto/requests";
import { BaseService } from "./base";
import { ApiError } from "../core";
import { HttpStatusCode } from "../enums";
import { UserDTO } from "../dto/requests/user/UserDto";
import { IUser } from "src/interfaces";

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

      const result: IUser = await this._repos.save(new UserModel(user));

      return result;
    } catch (error) {
      throw error;
    }
  };

  public getUserNotPagging = async () => {
    try {
      return await this._repos.retrieve();
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };
}

Object.seal(UserService);
export { UserService };
