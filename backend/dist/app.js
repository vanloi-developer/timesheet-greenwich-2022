"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const Server_1 = require("./Server");
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Application class.
 * @description Handle init config and components.
 */
dotenv_1.default.config({
    path: ".env",
});
class Application {
    init() {
        this.initServer();
    }
    initServer() {
        this.server = new Server_1.Server();
    }
    start() {
        ((port = process.env.APP_PORT || 5000) => {
            this.server.app.listen(port, () => console.log(`> Listening on port ${port}`));
            this.server.app.use('/api', this.server.router);
        })();
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map