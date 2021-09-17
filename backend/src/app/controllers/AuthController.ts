import { BaseController } from "./base";

import { AuthService } from "../services";

import * as express from "express";
import { AuthenticateRequest } from "../dto/requests";

class AuthController extends BaseController<AuthService> {
  constructor() {
    super(new AuthService());
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
export { AuthController };
