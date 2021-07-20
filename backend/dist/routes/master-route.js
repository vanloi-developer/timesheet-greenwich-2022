"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const test_router_1 = __importDefault(require("./test-router"));
class MasterRouter {
    constructor() {
        this._router = express_1.Router();
        this._subrouter = test_router_1.default;
        this._configure();
    }
    get router() {
        return this._router;
    }
    /**
     * Connect routes to their matching routers.
     */
    _configure() {
        this._router.use('/test', this._subrouter);
    }
}
module.exports = new MasterRouter().router;
//# sourceMappingURL=master-route.js.map