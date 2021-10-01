"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const index_1 = require("./../constants/index");
const FieldValidate_1 = require("../middlewares/validate/FieldValidate");
const MyTimesheetsService_1 = __importDefault(require("../services/MyTimesheetsService"));
// import MyTimesheetsService from '../services/MyTimesheetsService';
const BaseRouter_1 = require("./BaseRouter");
class MyTimesheetsRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this._service = MyTimesheetsService_1.default;
        this.init();
    }
    init() {
        this.router.post('/SubmitToPending', (0, FieldValidate_1.validate)(index_1.REQUIRED_FIELD_SUBMIT_MYTIMSHEETS), this._service.submit);
        this.router.post('/Create', (0, FieldValidate_1.validate)(index_1.REQUIRED_FIELD_CREATE_MYTIMSHEETS), this._service.create);
        this.router.get('/GetAllTimeSheetOfUser', this._service.getAllOfUser);
    }
}
module.exports = new MyTimesheetsRouter().router;
//# sourceMappingURL=MyTimesheetsRouter.js.map