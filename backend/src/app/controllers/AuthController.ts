import * as express from "express";

import { AuthenticateModel } from "../dto/requests";

import { AuthenticateResultModel } from "../dto/responses";

import { AuthService } from "../services";

import { HttpStatusCode } from "../enums";

class AuthController {
  private _business: AuthService = new AuthService();

  public authenticate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const request: AuthenticateModel = req.body;

      const response: AuthenticateResultModel =
        await this._business.authenticate(request);

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(AuthController);
export { AuthController };
