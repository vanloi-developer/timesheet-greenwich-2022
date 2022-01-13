import jwt, { JwtPayload } from "jsonwebtoken";

import { TOKEN as _ } from "../../configs";

export interface DataStoredInToken {
  userId: string;
}

class JWT {
  private SECRET_KEY: string;

  private OPTIONS: typeof _.OPTIONS = _.OPTIONS;

  constructor() {
    this.SECRET_KEY = _.SECRET_KEY;
  }

  public createToken(payload: DataStoredInToken) {
    return `${jwt.sign(payload, this.SECRET_KEY, this.OPTIONS)}`;
  }

  public verifyToken(token: string) {
    return jwt.verify(token, this.SECRET_KEY);
  }
}

Object.seal(JWT);
export const jwtTool = new JWT();
