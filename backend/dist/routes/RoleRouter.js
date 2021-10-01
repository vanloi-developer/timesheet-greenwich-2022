"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const FieldValidate_1 = require("./../middlewares/validate/FieldValidate");
const index_1 = require("./../constants/index");
const RoleService_1 = __importDefault(require("../services/RoleService"));
const BaseRouter_1 = require("./BaseRouter");
class RoleRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this._service = RoleService_1.default;
        this.init();
    }
    init() {
        this.router.post('/Create', (0, FieldValidate_1.validate)(index_1.REQUIRED_FIELD_CREATE_ROLE), this._service.create);
        this.router.get('/GetAll', this._service.filterAll);
        this.router.delete('/Delete', FieldValidate_1.validQueryID, this._service.delete);
    }
}
module.exports = new RoleRouter().router;
//# sourceMappingURL=RoleRouter.js.map