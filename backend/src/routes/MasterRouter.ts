import { Router } from 'express';
import testRouter from "./TestRouter";
import authLoginRouter from "./AuthLoginRouter";
import bodyParser = require('body-parser');
import cors = require('cors')

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
    this._router.use(cors());

    this._router.use(bodyParser.json()); // to support JSON-encoded bodies
    this._router.use(
      bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true
      })
    );
  }

  /**
   * Connect routes to their matching routers.
   */
  private initMasterRouter() {
    this._router.use("/test", testRouter);
    this._router.use("/services/app", authLoginRouter);
  }
}

export = new MasterRouter().router;
