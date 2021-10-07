"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const Server_1 = require("./Server");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = __importDefault(require("./config/logger"));
/**
 * Application class.
 * @description Handle init config and components.
 */
dotenv_1.default.config({
    path: '.env',
});
class Application {
    init() {
        this.initServer();
        this.server.initRouter();
        db_1.default.connect();
    }
    initServer() {
        this.server = new Server_1.Server();
    }
    start() {
        ((port = process.env.APP_PORT || 5000) => {
            this.server.app.listen(port, () => logger_1.default.cyan(`> Server is running at http://localhost:${port}`));
        })();
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map