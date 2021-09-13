import { jwtTool } from "../tools";
import * as express from "express";
import { userRepos } from "../../dataAccess/repositories";

class Authenticator {
  private _repos: typeof userRepos = userRepos;

  public authentication = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!req.headers.authorization) {
        throw new Error(`Required token before you can access`);
      }

      const token = req.headers.authorization.split(" ")[1];

      const decoded = await jwtTool.verifyToken(token);

      //@ts-ignore
      const user = await this._repos.findById(decoded.userId);

      req.app.locals.currentUser = user;

      next();
    } catch (error) {
      next(error);
    }
  };
}

export = new Authenticator();
