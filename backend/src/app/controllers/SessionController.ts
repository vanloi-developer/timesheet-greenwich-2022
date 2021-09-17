import { BaseController } from "./base";

import * as express from "express";

import { SessionService } from "../services";

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
      let response = {
        result: {
          application: {
            version: "4.3.0.0",
            releaseDate: new Date().toString(),
            features: {},
          },
          user: null,
          tenant: null,
        },
        targetUrl: null,
        success: true,
        error: null,
        unAuthorizedRequest: false,
        __abp: true,
      };

      if (!req.headers.authorization) {
        return res.status(200).json(response);
      }

      const token = req.headers.authorization.split(" ")[1];

      response.result.user = await this._business.getCurrentLoginInformations(
        token
      );

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(SessionController);
export { SessionController };
