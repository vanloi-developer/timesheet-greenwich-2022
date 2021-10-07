"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseResDto_1 = require("../dto/resDto/BaseResDto");
const MyTimessheetsRepository_1 = __importDefault(require("../repositories/MyTimessheetsRepository"));
const logger_1 = __importDefault(require("../config/logger"));
const generateID_1 = __importDefault(require("../utils/generateID"));
class MyTimesheetsService {
    constructor() {
        this._repository = MyTimessheetsRepository_1.default;
        this.getAllOfUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.local.id;
            const startDate = String(req.query.startDate);
            const endDate = String(req.query.endDate);
            try {
                const result = yield this._repository.filterByUserId(userId, startDate, endDate);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getAll MyTimesheetsService error: ', error.message);
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const myTimesheetsInput = Object.assign({}, req.body);
            try {
                //Auto generate id
                const id = (0, generateID_1.default)('mytimesheets');
                myTimesheetsInput.id = id;
                myTimesheetsInput.userId = req.local.id;
                let result = yield this._repository.create(myTimesheetsInput);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('createmyTimesheets myTimesheetsService error: ', error.message);
                next(error);
            }
        });
        this.submit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.local.id;
            const startDate = String(req.body.startDate);
            const endDate = String(req.body.endDate);
            try {
                const numberOfSubmit = (yield this._repository.updateStatusByUserId(userId, startDate, endDate)) || 0;
                //             fail: " - Fail 0 timesheets."
                // failedCount: 0
                // lockDate: " - Locked date: 03-10-2021."
                // success: " - Success 1 timesheets."
                // successCount: 1
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: `Submit success ${numberOfSubmit} timesheets` }));
            }
            catch (error) {
                logger_1.default.error('submit MyTimesheetsService error: ', error.message);
                next(error);
            }
        });
    }
}
module.exports = new MyTimesheetsService();
//# sourceMappingURL=MyTimesheetsService.js.map