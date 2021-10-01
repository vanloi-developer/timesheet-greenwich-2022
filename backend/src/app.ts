import express from "express";

import morgan from "morgan";

import cors from "cors";

import path from "path";

import { PORT } from "./configs";

import { ApiRouter } from "./routes/ApiRouter";

import { handlingError, catch404 } from "./app/core";

import { DataAccess } from "./dataAccess/mongo/connection";

class Application {
  private _server = express();

  constructor() {
    this.initializeMiddleware();

    this.connectDatabase();

    this.start();

    this.initializeHttpException();
  }

  public initializeMiddleware() {
    this._server.use(morgan("tiny"));

    this._server.use(cors());

    this._server.use(express.json());

    this._server.use(express.urlencoded({ extended: true }));
  }

  public async initializeHttpException() {
    this._server.use([handlingError, catch404]);
  }

  public async connectDatabase() {
    await DataAccess.connect();
  }
  public start() {
    this._server.listen(PORT, () => {
      console.log(`: ${PORT}`);
    });

    this._server.use("/api", new ApiRouter()._router);

    this._server.use(
      "/avatars",
      express.static(path.resolve("public/avatars"))
    );
  }
}

Object.seal(Application);
export { Application };
