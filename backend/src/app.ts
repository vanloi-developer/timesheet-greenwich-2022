import Server from "./Server";
import config from "./configs/app";

import Logger from "./app/Providers/winston";

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

  start() {
    ((port = config.APP_PORT || 5007) => {
      this._server._app.listen(port, () => {        
        Logger.logger.info(`Server is running at ${config.APP_HOST}:${port}`);
      });

      this._server._app.use("/api", this._server._routes);
    })();
  }
}

Object.seal(Application);
export = Application;
