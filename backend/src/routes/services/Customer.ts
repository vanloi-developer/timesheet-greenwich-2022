import { CustomerController } from "../../app/controllers";

import { authenticator, Authorization } from "../../app/core";

import { BaseRouter } from "../base";

class CustomerRouter extends BaseRouter {
  private _controller: CustomerController = new CustomerController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post("/save", this._controller.save);
    this._router.delete("/delete", this._controller.delete);
    this._router.get("/getAll", this._controller.getAll);
    this._router.post("/getAllPagging", this._controller.getAllPagging);
  }
}

Object.seal(CustomerRouter);
export { CustomerRouter };
