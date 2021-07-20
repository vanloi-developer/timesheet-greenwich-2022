"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./server");
// load the environment variables from the .env file
dotenv_1.default.config({
    path: ".env",
});
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
// class Server {
//   public app = express();
//   public router = MasterRoute;
// }
// // initialize server app
// const server = new Server();
// // make server listen on some port
// ((port = process.env.APP_PORT || 5000) => {
//   server.app.listen(port, () => console.log(`> Listening on port ${port}`));
// })();
// server.app.use('/api', server.router);
class Application {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initServer();
        });
    }
    initServer() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(process.env.APP_PORT);
            this.server = new server_1.Server();
        });
    }
    start() {
        ((port = process.env.APP_PORT || 5000) => {
            this.server.app.listen(port, () => console.log(`> Listening on port ${port}`));
        })();
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map