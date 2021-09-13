import { BaseRepository } from "./base";

import { userModel } from "../schemas";

import { userSchema } from "../schemas/UserSchema";

import { IUser } from "../../app/interfaces";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(userModel);
  }

  public findByUsername = async (username: string) => {
    return await this._model.findOne({ username });
  };

}

Object.seal(UserRepository);
export const userRepos = new UserRepository();
