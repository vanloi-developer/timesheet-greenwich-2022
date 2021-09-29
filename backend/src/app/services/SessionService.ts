import { jwtTool } from "../tools";

import { BaseService } from "./base";

import { UserRepository } from "../../dataAccess/repositories";

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
