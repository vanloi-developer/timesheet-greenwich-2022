import { Router } from 'express';
import testRouter from "./TestRouter";
import bodyParser = require('body-parser');

class MasterRouter {
  private _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
    this.initMasterRouter();
  }

  private configure() {
    // define onfigurations
  }

  /**
   * Connect routes to their matching routers.
   */
  private initMasterRouter() {
    this._router.use("/test", testRouter);
  }
}

export = new MasterRouter().router;
