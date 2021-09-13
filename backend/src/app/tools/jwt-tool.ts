import jwt, { JwtPayload } from "jsonwebtoken";

import { TOKEN as _ } from "../../configs";

import { DataStoredInToken } from "../interfaces";

class JWT {
  private SECRET_KEY: string;

  constructor() {
    this.SECRET_KEY = _.SECRET_KEY;
  }

  public createToken(payload: DataStoredInToken, options: typeof _.OPTIONS) {
    return `Bearer ${jwt.sign(payload, this.SECRET_KEY, options)}`;
  }

  public verifyToken(token: string) {
    return jwt.verify(token, this.SECRET_KEY);
  }
}

Object.seal(JWT);
export const jwtTool = new JWT();
