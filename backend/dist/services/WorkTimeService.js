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
const constants_1 = require("../constants");
const UserResDto_1 = require("../dto/resDto/UserResDto");
class WorkTimeService {
    constructor() {
        this.worktime = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).json(Object.assign(Object.assign({}, UserResDto_1.UserResDTO), { result: constants_1.WORKING_TIME }));
        });
    }
}
module.exports = new WorkTimeService();
//# sourceMappingURL=WorkTimeService.js.map