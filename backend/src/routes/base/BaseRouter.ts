import { IRouter, Router } from "express";

abstract class BaseRouter {
  private router: IRouter = Router();

  get _router() {
    return this.router;
  }

  abstract init(): void;
}

Object.seal(BaseRouter);
export { BaseRouter };
