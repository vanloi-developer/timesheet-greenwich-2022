import authenticator from "../../app/core/middlewares/authenticator";
import { ProjectController } from "../../app/controllers";
import { BaseRouter } from "../base";

export class ProjectRouter extends BaseRouter {
  private controller: ProjectController = new ProjectController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.get("/GetAll", this.controller.getAll);

    this._router.post("/Save", this.controller.save);

    this._router.post("/InActive", this.controller.inActive);

    this._router.post("/Active", this.controller.active);

    this._router.delete("/Delete", this.controller.delete);

    this._router.get("/Get", this.controller.get);

    this._router.get(
      "/GetProjectsIncludingTasks",
      authenticator.authenticate,
      this.controller.getProjectsIncludingTasks
    );

    this._router.get("/GetProjectFilterDto");

    this._router.get("/GetProjectPM");

    this._router.get("/GetProjectUser");

    this._router.get("/GetFilter");
  }
}
