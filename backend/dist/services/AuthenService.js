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
const AuthResultDto_1 = require("./../dto/AuthResultDto");
const BaseErrorDto_1 = require("./../dto/BaseErrorDto");
const BaseResDto_1 = require("./../dto/BaseResDto");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const logger_1 = __importDefault(require("../config/logger"));
const l = {
    result: [
        {
            name: 'Tien Pham',
            isActive: false,
            type: 0,
            jobTitle: null,
            level: 15,
            userCode: null,
            avatarPath: '/avatars/1632474098451_1_tien.pham.jpg',
            branch: null,
            id: 1,
        },
    ],
    targetUrl: null,
    success: true,
    error: null,
    unAuthorizedRequest: false,
    __abp: true,
};
class AuthenService {
    constructor() {
        this._repository = UserRepository_1.default;
        this.authen = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userNameOrEmailAddress, password } = req.body;
            try {
                const exitstedUser = yield this._repository.findByUserName(userNameOrEmailAddress);
                if (!exitstedUser)
                    return res.status(500).json(BaseErrorDto_1.LOGIN_FAILED);
                const checkPass = yield this._repository.comparePassword(userNameOrEmailAddress, password);
                if (!checkPass)
                    return res.status(500).json(BaseErrorDto_1.LOGIN_FAILED);
                const accessToken = yield this._repository.generateToken(userNameOrEmailAddress);
                console.log(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: Object.assign(Object.assign({}, AuthResultDto_1.AuthResultDto), { accessToken, userId: exitstedUser.id }) }));
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: Object.assign(Object.assign({}, AuthResultDto_1.AuthResultDto), { accessToken, userId: exitstedUser.id }) }));
            }
            catch (error) {
                logger_1.default.error('authen AuthenService error: ', error.message);
                next(error);
            }
        });
    }
}
module.exports = new AuthenService();
//# sourceMappingURL=AuthenService.js.map