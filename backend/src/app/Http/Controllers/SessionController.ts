import { BaseController } from "./base";

import * as express from "express";

import { sessionBusiness } from "../../business";

class SessionController extends BaseController<typeof sessionBusiness> {
  constructor() {
    super(sessionBusiness);
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
export const sessionController = new SessionController();
