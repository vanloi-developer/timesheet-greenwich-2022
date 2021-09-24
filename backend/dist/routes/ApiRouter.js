"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const AppRouter_1 = __importDefault(require("./AppRouter"));
const BaseRouter_1 = require("./BaseRouter");
const TestRouter_1 = __importDefault(require("./TestRouter"));
const AuthenService_1 = __importDefault(require("../services/AuthenService"));
class ApiRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.init();
    }
    /**
     * Connect routes to their matching routers.
     */
    init() {
        this.router.use("/test", TestRouter_1.default);
        this.router.use("/services/app", AppRouter_1.default);
        this.router.post("/TokenAuth/Authenticate", AuthenService_1.default);
    }
}
module.exports = new ApiRouter().router;
//# sourceMappingURL=ApiRouter.js.map