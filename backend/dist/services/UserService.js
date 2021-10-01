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
const BaseResDto_1 = require("./../dto/resDto/BaseResDto");
const UserResDto_1 = require("./../dto/resDto/UserResDto");
const index_1 = require("./../constants/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const logger_1 = __importDefault(require("../config/logger"));
const BaseErrorDto_1 = require("../dto/resDto/BaseErrorDto");
const generateID_1 = __importDefault(require("../utils/generateID"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY;
const saltRounds = 10;
class UserService {
    constructor() {
        this._repository = UserRepository_1.default;
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userInput = Object.assign({}, req.body);
            try {
                //Check if userName or email existed
                const exitstedUser = yield this._repository.findByUserNameEmail(userInput.userName, userInput.emailAddress);
                if (exitstedUser) {
                    let message = 'is already taken.';
                    const ERR_RES = (0, BaseErrorDto_1.baseError)();
                    if (Object.keys(exitstedUser)[0] === 'userName')
                        message = `User name '${exitstedUser.userName}' ` + message;
                    else
                        message = `Email address '${exitstedUser.emailAddress}' ` + message;
                    ERR_RES.error.message = message;
                    return res.status(500).json(ERR_RES);
                }
                //Hash pass and auto generate id
                const hashPass = yield bcrypt_1.default.hashSync(userInput.password, saltRounds);
                const id = (0, generateID_1.default)('user');
                userInput.password = hashPass;
                userInput.id = id;
                const result = yield this._repository.create(userInput);
                if (result)
                    throw new Error('Create user failed');
                delete result['password'];
                delete result['_id'];
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('createUser UserService error: ', error.message);
                next(error);
            }
        });
        this.findById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.query.Id);
            try {
                const result = yield this._repository.findById(id);
                if (!result)
                    return res.status(400).json(BaseErrorDto_1.NOT_EXIST_USER);
                return res.status(200).json(Object.assign(Object.assign({}, UserResDto_1.UserResDTO), { result }));
            }
            catch (error) {
                logger_1.default.error('getUserLoginInfo UserService error: ', error.message);
                next(error);
            }
        });
        this.getUserLoginInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.headers['authorization'] === undefined)
                return res.status(200).json(Object.assign({}, UserResDto_1.UserResDTO));
            const token = req.headers['authorization'].split(' ')[1];
            try {
                const { id } = yield jsonwebtoken_1.default.verify(token, JWT_KEY);
                const user = yield this._repository.findById(id);
                if (!user)
                    return res.status(400).json(BaseErrorDto_1.INVALID_TOKEN);
                return res.status(200).json(Object.assign(Object.assign({}, UserResDto_1.UserResDTO), { result: Object.assign(Object.assign({}, UserResDto_1.UserResDTO.result), { user }) }));
            }
            catch (error) {
                logger_1.default.error('getUserLoginInfo UserService error: ', error.message);
                next(error);
            }
        });
        this.getUserNotPagging = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._repository.findUserNotPagging();
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getUserNotPagging UserService error: ', error.message);
                next(error);
            }
        });
        this.getAllPagging = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { filterItems, maxResultCount, skipCount, searchText } = req.body;
            try {
                const result = yield this._repository.filterUserPagging(filterItems, maxResultCount, skipCount, searchText);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getAllPagging UserService error: ', error.message);
                next(error);
            }
        });
        this.findAllMangagers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._repository.getAllMangagers();
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('findAllMangagers UserService error: ', error.message);
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.query.Id);
            try {
                const data = yield this._repository.findById(id);
                if (!data)
                    return res.status(500).json(BaseErrorDto_1.NOT_EXIST_USER);
                yield this._repository.deleteUserById(id);
                return res.status(200).json(Object.assign(Object.assign({}, UserResDto_1.UserResDTO), { result: { message: 'Delete user successfully!' } }));
            }
            catch (error) {
                logger_1.default.error('delete UserService error: ', error.message);
                next(error);
            }
        });
        this.updateBase = (updatefield) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = yield this._repository.findById(req.body.id);
                    if (!data)
                        return res.status(500).json(BaseErrorDto_1.NOT_EXIST_USER);
                    const result = yield this._repository.update(req.body.id, updatefield ? updatefield : req.body);
                    return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
                }
                catch (error) {
                    logger_1.default.error('update UserService error: ', error.message);
                    next(error);
                }
            });
        };
        this.update = this.updateBase();
        this.updateImg = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let userId = 0;
            if (req.body.userId) {
                userId = Number(JSON.parse(JSON.stringify(req.body)).userId);
            }
            else {
                userId = req.local.id;
            }
            try {
                const avatarPath = '/avartar/' + req.files[0].filename;
                const data = yield this._repository.findById(userId);
                if (!data)
                    return res.status(500).json(BaseErrorDto_1.NOT_EXIST_USER);
                yield this._repository.update(userId, { avatarPath });
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: avatarPath }));
            }
            catch (error) {
                logger_1.default.error('updateImg UserService error: ', error.message);
                next(error);
            }
        });
        this.deactive = this.updateBase({ isActive: false });
        this.active = this.updateBase({ isActive: true });
        this.ResetPasword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { adminPassword, newPassword, userId } = req.body;
            try {
                if (adminPassword !== index_1.ADMIN_PASSWORD)
                    return res.status(400).json(BaseErrorDto_1.WRONG_ADMIN_PASS);
                const user = yield this._repository.findById(userId);
                if (!user)
                    return res.status(500).json(BaseErrorDto_1.NOT_EXIST_USER);
                yield this._repository.resetPassword(userId, { password: newPassword });
                return res.status(200).json(Object.assign({}, UserResDto_1.UserResDTO));
            }
            catch (error) {
                logger_1.default.error('getUserLoginInfo UserService error: ', error.message);
                next(error);
            }
        });
    }
}
module.exports = new UserService();
//# sourceMappingURL=UserService.js.map