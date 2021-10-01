"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const index_1 = require("./../constants/index");
const FieldValidate_1 = require("./../middlewares/validate/FieldValidate");
const FieldValidate_2 = require("./../middlewares/validate/FieldValidate");
const BaseRouter_1 = require("./BaseRouter");
const CustomerService_1 = __importDefault(require("../services/CustomerService"));
class CustomerRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this._service = CustomerService_1.default;
        this.init();
    }
    init() {
        this.router.get('/GetAll', this._service.getAll);
        this.router.post('/Save', (0, FieldValidate_1.validate)(index_1.REQUIRED_FIELD_SAVE_CUSTOMER), this._service.create);
        this.router.post('/GetAllPagging', this._service.getAllPagging);
        this.router.delete('/Delete', FieldValidate_2.validQueryID, this._service.delete);
    }
}
module.exports = new CustomerRouter().router;
//# sourceMappingURL=CustomerRouter.js.map