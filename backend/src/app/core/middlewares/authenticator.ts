import * as express from "express";

import { jwtTool } from "../../tools";

import { UserRepository } from "../../../dataAccess/repositories";

import { HttpStatusCode } from "../../enums";

import { ApiError } from "../exceptions";

class Authenticator {
  private _repos: UserRepository;

  constructor() {
    this._repos = new UserRepository();
  }

  public authenticate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!req.headers.authorization) {
        throw new ApiError(
          HttpStatusCode.UNAUTHORIZED,
          `Required token before you can access`
        );
      }

      const token = req.headers.authorization.split(" ")[1];

      const decoded = await jwtTool.verifyToken(token);

      if (!decoded) {
        throw new ApiError(HttpStatusCode.BAD_REQUEST, `Invalid Token`);
      }

      //@ts-ignore
      const user = await this._repos.findById(decoded.userId);

      req.app.locals.currentUser = user;

      next();
    } catch (error) {
      next(error);
    }
  };
}

export const authenticator = new Authenticator();
