import express from "express";

import { UserController } from "../../app/controllers/UserController";

import { BaseRouter } from "../base";

import Authenticator from "../../app/core/middlewares/authenticator";

class UserRouter extends BaseRouter {
  private controller: UserController = new UserController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post(
      "/create",
      Authenticator.authenticate,
      this.controller.create
    );
    this._router.put("/update");
    this._router.delete("/delete");
    this._router.get("/getUserNotPagging", this.controller.getUserNotPagging);
    this._router.get("/GetRoles");
    this._router.post("/GetAllPagging");
    this._router.get("/GetAllManager");
    this._router.post("/ActiveUser");
    this._router.post("/DeactiveUser");
    this._router.post("/UpdateAvatar");
    this._router.post("/UpdateOwnAvatar");
    this._router.post("/ResetPassword");
    this._router.get(
      "/get",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        return res.status(200).json(`Test API`);
      }
    );
  }
}
export { UserRouter };
