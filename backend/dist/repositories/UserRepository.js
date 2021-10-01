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
const index_1 = require("./../utils/index");
const index_2 = require("./../constants/index");
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
    findByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.findOne({ userName });
            }
            catch (error) {
                logger_1.default.error('findByID UserRepository error: ', error.message);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield yield this._db.findOne({ id }).select('-_id');
            }
            catch (error) {
                logger_1.default.error('findByID UserRepository error: ', error.message);
            }
        });
    }
    findUserNotPagging() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db
                    .find({})
                    .select('name isActive type jobTitle level userCode avatarPath branch id -_id');
            }
            catch (error) {
                logger_1.default.error('findUserNotPagging UserRepository error: ', error.message);
            }
        });
    }
    filterUserPagging(filterItems, maxResultCount, skipCount, searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            // If have filterItems. Create Option must have array in search
            let filterOpt = filterItems.length
                ? filterItems.map((item) => ({
                    [item.propertyName]: item.value,
                }))
                : [];
            //Search with name | username ... text
            if (searchText && searchText !== '') {
                let orOpt = (0, index_1.searchTextFieldOpt)(searchText, index_2.SEARCH_TEXT_FIELD_USER);
                if (orOpt.length)
                    filterOpt.push({ $or: orOpt });
            }
            const findOpt = filterOpt.length ? { $and: filterOpt } : {};
            try {
                const items = yield this._db.find(findOpt).skip(skipCount).limit(maxResultCount);
                return {
                    totalCount: items.length,
                    items,
                };
            }
            catch (error) {
                logger_1.default.error('findUserPagging UserRepository error: ', error.message);
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
    generateToken(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._db.findOne({ userName });
                return yield user.generateAuthToken();
            }
            catch (error) {
                logger_1.default.error('generateToken UserRepository error: ', error.message);
            }
        });
    }
    comparePassword(userName, plainPass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._db.findOne({ userName });
                return yield user.comparePassHash(plainPass);
            }
            catch (error) {
                logger_1.default.error('generateToken UserRepository error: ', error.message);
            }
        });
    }
    getAllMangagers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
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
                        {
                            name: 'Tien Nguyen Huu',
                            isActive: false,
                            type: 0,
                            jobTitle: null,
                            level: 15,
                            userCode: null,
                            avatarPath: '',
                            branch: null,
                            id: 5,
                        },
                        {
                            name: 'Thai Bui Minh',
                            isActive: false,
                            type: 0,
                            jobTitle: null,
                            level: 14,
                            userCode: null,
                            avatarPath: '',
                            branch: null,
                            id: 10,
                        },
                        {
                            name: 'duong nghi viec giua thang 5',
                            isActive: false,
                            type: 0,
                            jobTitle: null,
                            level: 9,
                            userCode: null,
                            avatarPath: '',
                            branch: null,
                            id: 21,
                        },
                        {
                            name: 'duong nghi viec giua thang 5',
                            isActive: false,
                            type: 0,
                            jobTitle: null,
                            level: 9,
                            userCode: 'acsdc',
                            avatarPath: '',
                            branch: null,
                            id: 22,
                        },
                        {
                            name: 'NCCOP Sir',
                            isActive: true,
                            type: 0,
                            jobTitle: null,
                            level: 10,
                            userCode: null,
                            avatarPath: '',
                            branch: null,
                            id: 23,
                        },
                        {
                            name: 'Bui Lam',
                            isActive: false,
                            type: 0,
                            jobTitle: null,
                            level: 5,
                            userCode: '',
                            avatarPath: '',
                            branch: null,
                            id: 24,
                        },
                        {
                            name: 'Uno VATest',
                            isActive: true,
                            type: 0,
                            jobTitle: null,
                            level: 9,
                            userCode: null,
                            avatarPath: '',
                            branch: null,
                            id: 48,
                        },
                        {
                            name: 'duong duong',
                            isActive: true,
                            type: 0,
                            jobTitle: null,
                            level: 0,
                            userCode: null,
                            avatarPath: '',
                            branch: null,
                            id: 84,
                        },
                        {
                            name: 'thao1212 thaoo',
                            isActive: true,
                            type: 0,
                            jobTitle: null,
                            level: 0,
                            userCode: null,
                            avatarPath: '',
                            branch: null,
                            id: 93,
                        },
                        {
                            name: 'thy phan',
                            isActive: true,
                            type: 0,
                            jobTitle: null,
                            level: 6,
                            userCode: 'thy11',
                            avatarPath: '',
                            branch: null,
                            id: 118,
                        },
                        {
                            name: 'Dai Trinh',
                            isActive: true,
                            type: 0,
                            jobTitle: null,
                            level: null,
                            userCode: null,
                            avatarPath: '',
                            branch: null,
                            id: 181,
                        },
                        {
                            name: 'hien pm1',
                            isActive: true,
                            type: 0,
                            jobTitle: null,
                            level: 7,
                            userCode: null,
                            avatarPath: '',
                            branch: null,
                            id: 219,
                        },
                    ],
                    targetUrl: null,
                    success: true,
                    error: null,
                    unAuthorizedRequest: false,
                    __abp: true,
                };
            }
            catch (error) {
                logger_1.default.error('getAllMangagers UserRepository error: ', error.message);
            }
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._db.deleteOne({ id });
            }
            catch (error) {
                logger_1.default.error('DeleteUserById UserRepository error: ', error.message);
            }
        });
    }
    update(id, updateFeild) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const a = yield this._db.updateOne({ id }, updateFeild);
                return a;
            }
            catch (error) {
                logger_1.default.error('findByID UserRepository error: ', error.message);
            }
        });
    }
    resetPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._db.findOneAndUpdate({ id }, password);
            }
            catch (error) {
                logger_1.default.error('findByID UserRepository error: ', error.message);
            }
        });
    }
}
module.exports = new UserRepository();
//# sourceMappingURL=UserRepository.js.map