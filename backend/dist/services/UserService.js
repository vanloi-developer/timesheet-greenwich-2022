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
const BaseResDto_1 = require("../dto/BaseResDto");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const logger_1 = __importDefault(require("../config/logger"));
const BaseErrorDto_1 = require("../dto/BaseErrorDto");
const genarateID_1 = __importDefault(require("../utils/genarateID"));
const saltRounds = 10;
class UserService {
    constructor() {
        this._repository = UserRepository_1.default;
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInput = Object.assign({}, req.body);
            try {
                //Check if email or username exist
                const exitstedUser = yield this._repository.findByUserNameEmail(userInput.userName, userInput.emailAddress);
                if (exitstedUser) {
                    let message = 'is already taken.';
                    if (Object.keys(exitstedUser)[0] === 'userName')
                        message = `User name '${exitstedUser.userName}' ` + message;
                    else
                        message = `Email address '${exitstedUser.emailAddress}' ` + message;
                    return res.status(500).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { error: Object.assign(Object.assign({}, BaseErrorDto_1.BaseErrorDto), { message }) }));
                }
                const salt = bcrypt_1.default.genSaltSync(saltRounds);
                const hashPass = yield bcrypt_1.default.hashSync(userInput.password, salt);
                const id = (0, genarateID_1.default)();
                userInput.password = hashPass;
                userInput.id = id;
                const user = yield this._repository.create(userInput);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: Object.assign({}, user) }));
            }
            catch (error) {
                logger_1.default.error('createUser UserService error: ', error.message);
            }
        });
    }
}
const validRequiredFeilds = (data) => { };
module.exports = new UserService();
//# sourceMappingURL=UserService.js.map