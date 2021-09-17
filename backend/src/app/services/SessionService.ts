import { UserRepository } from "../../dataAccess/repositories";

import { BaseService } from "./base";

import { jwtTool } from "../tools";

class SessionService extends BaseService<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  public getCurrentLoginInformations = async (token: string) => {
    const decoded = jwtTool.verifyToken(token);

    //@ts-ignore
    const currentUser = await this._repos.findById(decoded.userId);

    return currentUser;
  };
}

Object.seal(SessionService);
export { SessionService };
