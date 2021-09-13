import { BaseRouter } from "../base";

import UserRouter from "./UserRouter";

import SessionRouter from "./SessionRouter";

class ServiceRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.use("/user", UserRouter);
    this.router.use("/session", SessionRouter);
  }
}

export = new ServiceRouter().router;
