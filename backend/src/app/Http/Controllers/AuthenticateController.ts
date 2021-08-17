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
      res.status(200).json(response);
    } catch (error) {
      res.send(error).status(401);
    }
  };
}

Object.seal(AuthenticateController);
export = AuthenticateController;
