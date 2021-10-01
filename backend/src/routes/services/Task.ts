import { TaskController } from "../../app/controllers";

import { BaseRouter } from "../base";

import { authenticator, Authorization } from "../../app/core";

class TaskRouter extends BaseRouter {
  public _controller: TaskController = new TaskController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post(
      "/save",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this._controller.save
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
    this._router.delete(
      "/archive",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this._controller.archive
    );
    this._router.post(
      "/deArchive",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this._controller.deArchive
    );
  }
}

Object.seal(TaskRouter);

export { TaskRouter };
