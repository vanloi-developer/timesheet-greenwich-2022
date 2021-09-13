import express from "express";

import { userController } from "../../app/Http/Controllers";

import { BaseRouter } from "../base";


import Authenticator from "../../app/core/middleware-jwt";


class UserRouter extends BaseRouter {
  private controller: typeof userController = userController;

  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.use( Authenticator.authentication)
    this.router.post("/create", this.controller.create);
    this.router.put("/update");
    this.router.delete("/delete");
    this.router.get("/getAll", this.controller.retrieve);
    this.router.get(
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

export = new UserRouter().router;
