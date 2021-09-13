import { sessionController } from "../../app/Http/Controllers";
import { BaseRouter } from "../base";


class SessionRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.router.get(
      "/GetCurrentLoginInformations",
      sessionController.getCurrentLoginInformations
    );
  }
}

export = new SessionRouter().router;
