import { authController } from "../../app/Http/Controllers";
import { BaseRouter } from "../base";

class AuthRouter extends BaseRouter {
  private controller: typeof authController = authController;

  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post("/authenticate", this.controller.authenticate);
  }
}

Object.seal(AuthRouter);

export { AuthRouter };
