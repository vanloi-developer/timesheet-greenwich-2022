import { BaseController } from "./base";

import { authBusiness } from "../../business";

import * as express from "express";
import { AuthenticateRequest } from "../Requests";
import { userRepos } from "../../../dataAccess/repositories";

class AuthController extends BaseController<typeof authBusiness> {
  constructor() {
    super(authBusiness);
  }

  public authenticate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const request: AuthenticateRequest = req.body;

      const response = await this._business.authenticate(request);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(AuthController);
export const authController = new AuthController();
