import { RoleController } from "../../app/controllers";
import { BaseRouter } from "../base";

class RoleRouter extends BaseRouter {
  public _controller: RoleController = new RoleController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post("/create", this._controller.create);

    this._router.delete("/delete", this._controller.delete);

    this._router.get("/getAll", this._controller.getAll);

    this._router.get("/getRoleForEdit");
  }
}

Object.seal(RoleRouter);

export { RoleRouter };
