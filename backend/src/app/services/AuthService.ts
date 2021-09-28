import { AuthenticateModel } from "../dto/requests";
import { IUser } from "../../interfaces";
import { BaseService } from "./base";

import { jwtTool, PasswordManager } from "../tools";

import { TOKEN as _ } from "../../configs";
import { UserRepository } from "../../dataAccess/repositories";
import { ApiError } from "../core";
import { AuthenticateResultModel } from "../dto/responses";

class AuthService extends BaseService<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  public authenticate = async (request: AuthenticateModel) => {
    try {
      const { userNameOrEmailAddress, password } = request;

      const user = await this._repos.findByUsername(userNameOrEmailAddress);

      if (!user) {
        throw new ApiError(
          400,
          "username is not already exist, please register"
        );
      }

      const isValidPassword = await PasswordManager.compare(
        password,
        user.password
      );

      if (!isValidPassword) {
        console.log(isValidPassword);
        throw new ApiError(400, "Password is not match, try again.");
      }

      const userId = user.id;

      const payload = {
        userId,
      };

      const options = _.OPTIONS;

      const accessToken = await jwtTool.createToken(payload);

      const response: AuthenticateResultModel = {
        accessToken,
        encryptedAccessToken: "string",
        expireInSeconds: options.expiresIn,
        userId,
      };

      return response;
    } catch (error) {
      throw error;
    }
  };
}

Object.seal(AuthService);
export { AuthService };
