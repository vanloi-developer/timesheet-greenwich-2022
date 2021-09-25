"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const LoginValidate_1 = require("./../middlewares/validate/LoginValidate");
const AppRouter_1 = __importDefault(require("./AppRouter"));
const BaseRouter_1 = require("./BaseRouter");
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
        // this.router.use("/test", testRouter);
        this.router.use('/services/app', AppRouter_1.default);
        this.router.post('/TokenAuth/Authenticate', LoginValidate_1.validLogin, AuthenService_1.default.authen);
    }
}
module.exports = new ApiRouter().router;
//# sourceMappingURL=ApiRouter.js.map