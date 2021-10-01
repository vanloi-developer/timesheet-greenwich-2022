import { authenticator } from "../../app/core";

import { TimekeepingController } from "../../app/controllers";

import { BaseRouter } from "../base";

class TimeKeepingRouter extends BaseRouter {
  private controller: TimekeepingController = new TimekeepingController();
  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.get(
      "/GetMyDetails",
      authenticator.authenticate,
      this.controller.getMyDetails
    );
  }
}

Object.seal(TimeKeepingRouter);
export { TimeKeepingRouter };
