import AuthRouter from "./AuthRouter";
import BaseRouter from "./BaseRouter";

import { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import Logger from "../app/Providers/winston";

class MasterRouter extends BaseRouter {
  constructor() {
    super();

    this.initializeMiddleware();

    this.initializeRouting();
  }

  protected initializeMiddleware() {
    this.router.use(json());

    this.router.use(urlencoded({ extended: true }));

    this.router.use(cors());

    this.router.use(morgan('dev', { stream: Logger.stream }));

    // this.router.use(HandleException.handleError);

  }

  protected initializeRouting() {
    this.init();
  }

  protected init() {
    //this.router.use(`/services/app/user`, UserRouter);
    //this.router.use('/services/app/session', SessionRouter);
    this.router.use('/TokenAuth', AuthRouter);
  }
}

Object.seal(MasterRouter);

export = new MasterRouter().router;
