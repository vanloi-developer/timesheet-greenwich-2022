import { AuthenticateRequest } from "../Http/Requests/AuthenticateRequest";

interface IBusiness {}

class AuthenticateBusiness implements IBusiness {
  public authenticate = async (body: AuthenticateRequest) => {
    try {
      const response = {
        error: null,
        targetUrl: null,
        __abp: true,
        unAuthoziedRequest: false,
        success: true,
        result: {
          accessToken: `anything`,
          ecryptedToken: `anything`,
          expireInSecond: `9999`,
          userId: `userId`,
        },
      };

      return await response;
    } catch (error) {
      throw new Error(`Forbidden !`);
    }
  };
}

Object.seal(AuthenticateBusiness).bind(AuthenticateBusiness);
export = AuthenticateBusiness;
