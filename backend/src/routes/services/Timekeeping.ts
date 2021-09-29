import { Request, Response } from "express";
import { TimekeepingController } from "../../app/controllers";
import { BaseRouter } from "../base";

class TimeKeepingRouter extends BaseRouter {
  private controller: TimekeepingController = new TimekeepingController();
  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.get("/GetMyDetails", this.controller.getMyDetails);
  }
}

Object.seal(TimeKeepingRouter);
export { TimeKeepingRouter };
