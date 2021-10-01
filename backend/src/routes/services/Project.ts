import { authenticator, Authorization } from "../../app/core";

import { ProjectController } from "../../app/controllers";

import { BaseRouter } from "../base";

export class ProjectRouter extends BaseRouter {
  private controller: ProjectController = new ProjectController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.get(
      "/GetAll",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.getAll
    );

    this._router.post(
      "/Save",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.save
    );

    this._router.post(
      "/InActive",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.inActive
    );

    this._router.post(
      "/Active",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.active
    );

    this._router.delete(
      "/Delete",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.delete
    );

    this._router.get(
      "/Get",
      authenticator.authenticate,
      Authorization.confirm("ADMIN"),
      this.controller.get
    );

    this._router.get(
      "/GetProjectsIncludingTasks",
      authenticator.authenticate,
      Authorization.confirm("BASICUSER"),
      this.controller.getProjectsIncludingTasks
    );

    this._router.get("/GetProjectFilterDto");

    this._router.get("/GetProjectPM");

    this._router.get("/GetProjectUser");

    this._router.get("/GetFilter");
  }
}
