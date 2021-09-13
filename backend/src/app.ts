import express from "express";
import morgan from "morgan";
import cors from "cors";

import { APP } from "./configs";

import ApiRouter from "./routes/ApiRouter";

import { DataAccess } from "./dataAccess";

import { handleError, handleNotFoundPage } from "./app/exceptions";

class Application {
  public readonly application: express.Application;

  constructor() {
    this.application = express();
  }

  public initializeMiddleware() {
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: false }));
    this.application.use(morgan("tiny"));
    this.application.use(cors());
  }

  public async connectDatabase() {
    await DataAccess.connect();
  }

  public initializeErrorHandling() {
    this.application.use([handleNotFoundPage, handleError]);
  }

  public init() {
    this.application.use("/api", ApiRouter);

    this.application.listen(APP.PORT, () => {
      console.log(`Successfully connected to SERVER at PORT: ${APP.PORT}`);
    });

    this.application.use([handleError, handleNotFoundPage]);
  }
}

Object.seal(Application);
export = Application;
