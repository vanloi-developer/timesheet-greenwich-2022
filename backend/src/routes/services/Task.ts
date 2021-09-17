import { TaskController } from "../../app/controllers";
import { BaseRouter } from "../base";

class TaskRouter extends BaseRouter {
  public _controller: TaskController = new TaskController();

  constructor() {
    super();
    this.init();
  }

  public init() {
    this._router.post("/save", this._controller.save);
    this._router.delete("/delete", this._controller.delete);
    this._router.get("/getAll", this._controller.getAll);
    this._router.delete("/archive", this._controller.archive);
    this._router.post("/deArchive", this._controller.deArchive);
  }
}

Object.seal(TaskRouter);

export { TaskRouter };
