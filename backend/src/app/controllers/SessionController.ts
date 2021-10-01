import * as express from "express";

import { ApiResponse } from "../core";

import { BaseController } from "./base";

import { IResponse } from "../core/responses/interfaces";

import { SessionService } from "../services";

import { APP_VERSION } from "../../configs";

import { HttpStatusCode } from "../enums";

class SessionController extends BaseController<SessionService> {
  constructor() {
    super(new SessionService());
  }

  public getCurrentLoginInformations = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const result = {
        application: {
          version: APP_VERSION,
          releaseDate: new Date().toString(),
          features: {},
        },

        user: null,

        tenant: null,
      };

      let response: IResponse = {
        ...ApiResponse,
        result,
      };

      if (!req.headers.authorization) {
        return res.status(HttpStatusCode.OK).json(response);
      }

      const token = req.headers.authorization.split(" ")[1];

      response.result.user = await this._business.getCurrentLoginInformations(
        token
      );

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(SessionController);
export { SessionController };
