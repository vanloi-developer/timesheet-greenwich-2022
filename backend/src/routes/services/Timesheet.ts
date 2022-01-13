import { TimesheetController } from "../../app/controllers/TimesheetController";

import { BaseRouter } from "../base";

import { authenticator, Authorization } from "../../app/core";

class TimesheetRouter extends BaseRouter {
  private controller = new TimesheetController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.get(
      "/GetAll",
      authenticator.authenticate,
      Authorization.confirm("PROJECTMANAGER"),
      this.controller.retrieve
    );

    this._router.post(
      "/ApproveTimesheets",
      authenticator.authenticate,
      Authorization.confirm("PROJECTMANAGER"),
      this.controller.approve
    );

    this._router.post(
      "/RejectTimesheets",
      authenticator.authenticate,
      Authorization.confirm("PROJECTMANAGER"),
      this.controller.reject
    );
  }
}

Object.seal(TimesheetRouter);
export { TimesheetRouter };
