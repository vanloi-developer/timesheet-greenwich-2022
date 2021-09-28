import { MyTimesheetController } from "../../app/controllers";
import { BaseRouter } from "../base";

class MyTimesheetRouter extends BaseRouter {
  private controller: MyTimesheetController = new MyTimesheetController();
  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.get(
      "/getAllTimesheetOfUser",
      this.controller.getAllTimesheetOfUser
    );
  }
}

Object.seal(MyTimesheetRouter);
export { MyTimesheetRouter };
