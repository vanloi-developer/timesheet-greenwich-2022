import * as express from "express";

import { IUser } from "../../interfaces";

import { userModel } from "../../../dataAccess/schemas";

import { BaseController } from "./base";

import { userBusiness } from "../../business";

class UserController extends BaseController<typeof userBusiness> {
  constructor() {
    super(userBusiness);
  }

  public create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const response = await this._business.create(new userModel(req.body));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public retrieve = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {

      const response = await this._business.retrieve();
      if (!response) throw new Error(`Not Found User`);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(UserController);
export const userController = new UserController();
