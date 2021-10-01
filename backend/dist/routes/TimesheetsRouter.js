"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TimesheetsService_1 = __importDefault(require("../services/TimesheetsService"));
const BaseRouter_1 = require("./BaseRouter");
class TimesheetsRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this._service = TimesheetsService_1.default;
        this.init();
    }
    init() {
        this.router.get('/GetAll', this._service.getAll);
        this.router.post('/ApproveTimesheets', this._service.approve);
        this.router.post('/RejectTimesheets', this._service.reject);
    }
}
module.exports = new TimesheetsRouter().router;
//# sourceMappingURL=TimesheetsRouter.js.map