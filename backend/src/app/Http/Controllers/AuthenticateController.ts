import { NextFunction, Request, Response } from "express";
import AuthenticateBusiness from "../../Business/Authenticate";


class AuthenticateController {
  private _business = new AuthenticateBusiness();

  constructor() {}

  public authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await this._business.authenticate(req.body);
    //  if (response) return new ResponseJson(`Passing authentication`).json(res);
    } catch (error) {
      //return new AuthenticateFailureResponse(`Errorrrrrr`).json(res);
    }
  };
}

Object.seal(AuthenticateController);
export = AuthenticateController;
