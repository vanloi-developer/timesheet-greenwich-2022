import { userRepos } from "../../../dataAccess/repositories";

import { BaseBusiness } from "../base";

import { jwtTool } from "../../tools";

class SessionBusiness extends BaseBusiness<typeof userRepos> {
  constructor() {
    super(userRepos);
  }

  public getCurrentLoginInformations = async (token: string) => {
    const decoded = jwtTool.verifyToken(token);

    //@ts-ignore
    const currentUser = await this._repos.findById(decoded.userId);

    return currentUser;
  };
}

export const sessionBusiness = new SessionBusiness();
