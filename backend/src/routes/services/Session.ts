import { SessionController } from "../../app/controllers";

import { BaseRouter } from "../base";

class SessionRouter extends BaseRouter {
  private controller: SessionController = new SessionController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.get(
      "/GetCurrentLoginInformations",
      this.controller.getCurrentLoginInformations
    );
  }
}

Object.seal(SessionRouter);
export { SessionRouter };
