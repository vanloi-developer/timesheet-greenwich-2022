import { Router } from 'express';
import testRouter from './test-router';


class MasterRouter {
  private _router = Router();
  private _subrouter = testRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/test', this._subrouter);
  }
}

export = new MasterRouter().router;