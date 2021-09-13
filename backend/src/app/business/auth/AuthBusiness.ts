import { userRepos } from "../../../dataAccess/repositories";
import { AuthenticateRequest } from "../../http/Requests";
import { IUser } from "../../interfaces";
import { BaseBusiness } from "../base";

import { jwtTool, PasswordManager } from "../../tools";

import { TOKEN as _ } from "../../../configs";

class AuthBusiness extends BaseBusiness<typeof userRepos> {
  constructor() {
    super(userRepos);
  }

  public authenticate = async (request: AuthenticateRequest) => {
    try {
      const { userNameOrEmailAddress, password } = request;

      const user = await userRepos.findByUsername(userNameOrEmailAddress);

      if (!user) {
        throw new Error("username is not already exist, please register");
      }

      const isValidPassword = await PasswordManager.compare(
        password,
        user.password
      );

      if (!isValidPassword) {
        console.log(isValidPassword);
        throw new Error("Password is not match, try again.");
      }

      const userId = user._id.toString();

      const payload = {
        userId,
      };

      const options = _.OPTIONS;

      const accessToken = await jwtTool.createToken(payload, options);

      const response = {
        accessToken,
        encryptedAccessToken: "string",
        expireInSeconds: options.expiresIn,
        userId,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
}

Object.seal(AuthBusiness);
export const authBusiness = new AuthBusiness();
