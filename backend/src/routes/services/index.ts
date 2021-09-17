import { BaseRouter } from "../base";
import { SessionRouter } from "./Session";
import { TaskRouter } from "./Task";
import { UserRouter } from "./User";

class ServiceRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.use("/task", new TaskRouter()._router);
    this._router.use("/user", new UserRouter()._router);
    this._router.use("/session", new SessionRouter()._router);
  }
}

export { ServiceRouter };
