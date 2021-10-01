import { RoleRouter } from "./Role";

import { TaskRouter } from "./Task";

import { UserRouter } from "./User";

import { BaseRouter } from "../base";

import { ProjectRouter } from "./Project";

import { SessionRouter } from "./Session";

import { CustomerRouter } from "./Customer";

import { TimesheetRouter } from "./Timesheet";

import { MyTimesheetRouter } from "./MyTimesheet";

import { TimeKeepingRouter } from "./Timekeeping";

import { ConfigurationRouter } from "./Configuration";

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

    this._router.use("/timekeeping", new TimeKeepingRouter()._router);

    this._router.use("/timesheet", new TimesheetRouter()._router);

    this._router.use("/configuration", new ConfigurationRouter()._router);
  }
}

export { ServiceRouter };
