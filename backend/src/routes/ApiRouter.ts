import { BaseRouter } from "./base";

import services from "./services";

import { AuthRouter } from "./auth";


class ApiRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.use("/services/app", services);
    this.router.use("/TokenAuth", new AuthRouter().router);
  }
}

export = new ApiRouter().router;
