import Server from "./Server";
import MongooseConnection from "./dataAccess";

import config from "./configs/app";

import _ from "./app/Providers/winston";

/**
 * Application class.
 * @description Handle init config and components.
 */

interface IApplication {
  _server: Server;
}

class Application implements IApplication {
  _server: Server;

  constructor() {
    this._server = new Server();
  }

  async accessDatabase() {
    await MongooseConnection.connect();
  }

  start() {
    ((port = config.APP_PORT || 5007) => {
      this._server._app
        .listen(port, () => {
          _.logger.info(`Running server at port: ${port}`);
        })
        .on("error", (e) => _.logger.error(e));

      this._server._app.use("/api", this._server._routes);
    })();
  }
}

Object.seal(Application);
export = Application;
