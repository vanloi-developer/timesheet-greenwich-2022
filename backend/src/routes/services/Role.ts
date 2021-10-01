import { RoleController } from "../../app/controllers";

import { BaseRouter } from "../base";

import { authenticator, Authorization } from "../../app/core";

class RoleRouter extends BaseRouter {
  public _controller: RoleController = new RoleController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post(
      "/create",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this._controller.create
    );

    this._router.delete(
      "/delete",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this._controller.delete
    );

    this._router.get(
      "/getAll",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this._controller.getAll
    );

    this._router.get("/getRoleForEdit");
  }
}

Object.seal(RoleRouter);

export { RoleRouter };
