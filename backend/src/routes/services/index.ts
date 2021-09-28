import { BaseRouter } from "../base";

import { CustomerRouter } from "./Customer";
import { ProjectRouter } from "./Project";

import { RoleRouter } from "./Role";

import { SessionRouter } from "./Session";

import { TaskRouter } from "./Task";

import { UserRouter } from "./User";

import { MyTimesheetRouter } from "./MyTimesheet";

class ServiceRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.use("/task", new TaskRouter()._router);

    this._router.use("/user", new UserRouter()._router);

    this._router.use("/session", new SessionRouter()._router);

    this._router.use("/customer", new CustomerRouter()._router);

    this._router.use("/role", new RoleRouter()._router);

    this._router.use("/project", new ProjectRouter()._router);

    this._router.use("/myTimesheets", new MyTimesheetRouter()._router);
  }
}

export { ServiceRouter };
