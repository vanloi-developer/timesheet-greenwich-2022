"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_1 = require("../middlewares/auth");
const index_1 = require("./../constants/index");
const FieldValidate_1 = require("./../middlewares/validate/FieldValidate");
const AppRouter_1 = __importDefault(require("./AppRouter"));
const BaseRouter_1 = require("./BaseRouter");
const AuthenService_1 = __importDefault(require("../services/AuthenService"));
const UserService_1 = __importDefault(require("../services/UserService"));
class ApiRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this._userService = UserService_1.default;
        this._authenService = AuthenService_1.default;
        this.init();
    }
    init() {
        this.router.get('/services/app/Session/GetCurrentLoginInformations', this._userService.getUserLoginInfo);
        this.router.post('/TokenAuth/Authenticate', (0, FieldValidate_1.validate)(index_1.REQUIRED_FIELD_LOGIN), this._authenService.authen);
        this.router.use('/services/app', auth_1.authen, AppRouter_1.default);
    }
}
module.exports = new ApiRouter().router;
//# sourceMappingURL=ApiRouter.js.map