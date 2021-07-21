"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const TestRouter_1 = __importDefault(require("./TestRouter"));
const AuthLoginRouter_1 = __importDefault(require("./AuthLoginRouter"));
const bodyParser = require("body-parser");
const cors = require("cors");
class MasterRouter {
    constructor() {
        this._router = express_1.Router();
        this.configure();
        this.initMasterRouter();
    }
    get router() {
        return this._router;
    }
    configure() {
        // define onfigurations
        this._router.use(cors());
        this._router.use(bodyParser.json()); // to support JSON-encoded bodies
        this._router.use(bodyParser.urlencoded({
            // to support URL-encoded bodies
            extended: true
        }));
    }
    /**
     * Connect routes to their matching routers.
     */
    initMasterRouter() {
        this._router.use("/test", TestRouter_1.default);
        this._router.use("/services/app", AuthLoginRouter_1.default);
    }
}
module.exports = new MasterRouter().router;
//# sourceMappingURL=MasterRouter.js.map