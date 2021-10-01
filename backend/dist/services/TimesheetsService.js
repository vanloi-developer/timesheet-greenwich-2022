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
const logger_1 = __importDefault(require("../config/logger"));
const MyTimessheetsRepository_1 = __importDefault(require("../repositories/MyTimessheetsRepository"));
class TimesheetsService {
    constructor() {
        this._repository = MyTimessheetsRepository_1.default;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { startDate, endDate } = req.query;
            const status = Number(req.query.status);
            try {
                const result = yield this._repository.filterAll(status, startDate, endDate);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getAll TimesheetsService error: ', error.message);
                next(error);
            }
        });
        this.updateBase = (status) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const myTiemsheetsIdsArr = req.body;
                try {
                    yield this._repository.updateManyStatus(myTiemsheetsIdsArr, status);
                    return res.status(200).json(BaseResDto_1.BaseResDto);
                }
                catch (error) {
                    logger_1.default.error('updateBase UserService error: ', error.message);
                    next(error);
                }
            });
        };
        this.approve = this.updateBase(2);
        this.reject = this.updateBase(3);
    }
}
module.exports = new TimesheetsService();
//# sourceMappingURL=TimesheetsService.js.map