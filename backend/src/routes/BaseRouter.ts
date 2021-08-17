import { Router } from "express";

abstract class BaseRouter {
  private _router: Router = Router();

  get router(): Router {
    return this._router;
  }

  protected abstract init(): void;
}

Object.seal(BaseRouter);
export = BaseRouter;
