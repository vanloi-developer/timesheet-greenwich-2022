"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_1 = require("./../middlewares/auth");
const storeAvatar_1 = require("./../middlewares/storeAvatar");
const index_1 = require("./../constants/index");
const FieldValidate_1 = require("./../middlewares/validate/FieldValidate");
const UserService_1 = __importDefault(require("../services/UserService"));
const BaseRouter_1 = require("./BaseRouter");
const UserValidate_1 = require("../middlewares/validate/UserValidate");
const RoleService_1 = __importDefault(require("../services/RoleService"));
const FieldValidate_2 = require("./../middlewares/validate/FieldValidate");
class UserRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this._userService = UserService_1.default;
        this._roleService = RoleService_1.default;
        this.init();
    }
    init() {
        this.router.get('/GetRoles', auth_1.authorAdmin, this._roleService.findAll);
        this.router.get('/GetUserNotPagging', auth_1.authorAdmin, this._userService.getUserNotPagging);
        this.router.get('/Get', auth_1.authorAdmin, FieldValidate_2.validQueryID, this._userService.findById);
        this.router.get('/GetAllManager', auth_1.authorAdmin, (req, res) => {
            res.status(200).json(index_1.FAKE_MANAGERS);
        });
        this.router.post('/UpdateYourOwnAvatar', storeAvatar_1.storeAvatar, this._userService.updateImg);
        this.router.post('/UpdateAvatar', auth_1.authorAdmin, storeAvatar_1.storeAvatar, this._userService.updateImg);
        this.router.post('/Create', auth_1.authorAdmin, UserValidate_1.validCreate, this._userService.create);
        this.router.post('/GetAllPagging', auth_1.authorAdmin, this._userService.getAllPagging);
        this.router.post('/DeactiveUser', auth_1.authorAdmin, this._userService.deactive);
        this.router.post('/ActiveUser', auth_1.authorAdmin, this._userService.active);
        this.router.post('/ResetPassword', auth_1.authorAdmin, (0, FieldValidate_1.validate)(index_1.REQUIRED_FIELD_RESET_PASS), this._userService.ResetPasword);
        this.router.put('/Update', auth_1.authorAdmin, this._userService.update);
        this.router.delete('/Delete', auth_1.authorAdmin, FieldValidate_2.validQueryID, this._userService.delete);
    }
}
module.exports = new UserRouter().router;
//# sourceMappingURL=UserRouter.js.map