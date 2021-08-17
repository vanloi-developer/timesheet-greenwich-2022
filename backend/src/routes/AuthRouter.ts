import BaseRouter from "./BaseRouter";
import AuthenticateController from "../app/Http/Controllers/AuthenticateController";

class AuthRoutes extends BaseRouter {
  private controller: AuthenticateController = new AuthenticateController();

  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.post("/Authenticate", this.controller.authenticate);
  }
}

Object.seal(AuthRoutes);
export = new AuthRoutes().router;
