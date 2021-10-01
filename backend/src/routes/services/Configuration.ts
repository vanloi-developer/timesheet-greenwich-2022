import { ConfigurationController } from "../../app/controllers";

import { BaseRouter } from "../base";

class ConfigurationRouter extends BaseRouter {
  private controller: ConfigurationController = new ConfigurationController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.get(
      "/GetWorkingTimeConfigAllBranch",
      this.controller.getWorkingTimeConfigAllBranch
    );
  }
}

Object.seal(ConfigurationRouter);
export { ConfigurationRouter };
