import { AuthController } from "../../app/controllers";

import { BaseRouter } from "../base";

class AuthRouter extends BaseRouter {
  private controller: AuthController = new AuthController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post("/authenticate", this.controller.authenticate);
  }
}

Object.seal(AuthRouter);

export { AuthRouter };
