import { AuthRouter } from "./auth/AuthRouter";

import { ServiceRouter } from "./services";

import { BaseRouter } from "./base";

class ApiRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.use("/services/app", new ServiceRouter()._router);

    this._router.use("/TokenAuth", new AuthRouter()._router);
  }
}

export { ApiRouter };
