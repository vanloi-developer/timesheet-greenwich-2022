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
const models_1 = __importDefault(require("../models"));
const logger_1 = __importDefault(require("../config/logger"));
class UserRepository {
    constructor() {
        this._db = models_1.default.User;
    }
    findByUserNameEmail(userName, emailAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._db.findOne({ userName });
                if (user)
                    return { userName: user.userName };
                let userByEmail = yield this._db.findOne({ emailAddress });
                if (userByEmail)
                    return { emailAddress: userByEmail.emailAddress };
                return null;
            }
            catch (error) {
                logger_1.default.error('findByUserNameEmail UserRepository error: ', error.message);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.create(data);
            }
            catch (error) {
                logger_1.default.error('findByUserNameEmail UserRepository error: ', error.message);
            }
        });
    }
}
module.exports = new UserRepository();
//# sourceMappingURL=UserRepository.js.map