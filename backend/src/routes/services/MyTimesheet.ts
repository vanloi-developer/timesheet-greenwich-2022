import { MyTimesheetController } from "../../app/controllers";

import { BaseRouter } from "../base";

import Authenticator from "../../app/core/middlewares/authenticator";
class MyTimesheetRouter extends BaseRouter {
  private controller: MyTimesheetController = new MyTimesheetController();
  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post(
      "/SaveList",
      Authenticator.authenticate,
      this.controller.saveList
    );

    this._router.delete(
      "/Delete",
      Authenticator.authenticate,
      this.controller.delete
    );

    this._router.post(
      "/SaveAndReset",
      Authenticator.authenticate,
      this.controller.save
    );

    this._router.put(
      "/Update",
      Authenticator.authenticate,
      this.controller.save
    );

    this._router.post(
      "/SubmitToPending",
      Authenticator.authenticate,
      this.controller.submitToPending
    );

    this._router.post(
      "/Create",
      Authenticator.authenticate,
      this.controller.save
    );

    this._router.get(
      "/GetAllTimesheetOfUser",
      Authenticator.authenticate,
      this.controller.getAllTimesheetOfUser
    );

    this._router.get("/Get", Authenticator.authenticate, this.controller.get);
  }
}

Object.seal(MyTimesheetRouter);
export { MyTimesheetRouter };
