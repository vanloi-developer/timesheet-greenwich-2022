import { MyTimesheetController } from "../../app/controllers";

import { BaseRouter } from "../base";

import { authenticator, Authorization } from "../../app/core";

class MyTimesheetRouter extends BaseRouter {
  private controller: MyTimesheetController = new MyTimesheetController();
  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post(
      "/SaveList",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      this.controller.saveList
    );

    this._router.delete(
      "/Delete",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      this.controller.delete
    );

    this._router.post(
      "/SaveAndReset",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      this.controller.save
    );

    this._router.put(
      "/Update",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      this.controller.save
    );

    this._router.post(
      "/SubmitToPending",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      this.controller.submitToPending
    );

    this._router.post(
      "/Create",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      this.controller.save
    );

    this._router.get(
      "/GetAllTimesheetOfUser",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      this.controller.getAllTimesheetOfUser
    );

    this._router.get(
      "/Get",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      this.controller.get
    );
  }
}

Object.seal(MyTimesheetRouter);
export { MyTimesheetRouter };
