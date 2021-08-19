import AuthRouter from "./AuthRouter";
import BaseRouter from "./BaseRouter";

import { json, Request, urlencoded, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import _ from "../app/Providers/winston";

import { NotFoundError, InternalError, HttpException } from "../app/Exceptions";
import config from "../configs/app";

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

    this.router.use(morgan("dev", { stream: _.stream }));

    this.router.use((req, res, next) => next(new NotFoundError()));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.router.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof HttpException) {
          HttpException.handle(error, res);
        } else {
          if ((config.NODE_ENV = `development`)) {
            _.logger.error(error);
            return res.status(500).send(error.message);
          }
          HttpException.handle(new InternalError(), res);
        }
      }
    );
  }

  protected initializeRouting() {
    this.init();
  }

  protected init() {
    //this.router.use(`/services/app/user`, UserRouter);
    //this.router.use('/services/app/session', SessionRouter);
    this.router.use("/TokenAuth", AuthRouter);
  }
}

Object.seal(MasterRouter);

export = new MasterRouter().router;
