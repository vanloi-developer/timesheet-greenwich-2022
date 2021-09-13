import { userRepos } from "../../../dataAccess/repositories";

import { CreateUserDTO } from "../../http/Requests/CreateUserDTO";

import { BaseBusiness } from "../base";

class UserBusiness extends BaseBusiness<typeof userRepos> {
  constructor() {
    super(userRepos);
  }

  public create = async (user: CreateUserDTO) => {
    try {
      const isExist = await this._repos.findByUsername(user.username);

      if (isExist) {
        throw new Error(`username is already exist, try again`);
      }

      return await this._repos.create(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  public retrieve = async () => {
    try {
      return await this._repos.retrieve();
    } catch (error) {
      throw new Error(error);
    }
  };
}

Object.seal(UserBusiness);
export const userBusiness = new UserBusiness();
