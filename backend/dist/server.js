"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const MasterRoute_1 = __importDefault(require("./routes/MasterRoute"));
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
    constructor() {
        this.app = express_1.default();
        this.router = MasterRoute_1.default;
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map