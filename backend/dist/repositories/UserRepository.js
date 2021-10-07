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
const BaseRepository_1 = require("./base/BaseRepository");
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.default.User, 'UserRepository');
    }
    findByUserNameEmail(userName, emailAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this._db.findOne({ userName });
            if (user)
                return { userName: user.userName };
            let userByEmail = yield this._db.findOne({ emailAddress });
            if (userByEmail)
                return { emailAddress: userByEmail.emailAddress };
            return null;
        });
    }
    findUserNotPagging() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db
                .find({})
                .select('name isActive type jobTitle level userCode avatarPath branch id -_id');
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
            const items = yield this._db.find(findOpt).skip(skipCount).limit(maxResultCount);
            return {
                totalCount: items.length,
                items,
            };
        });
    }
    generateToken(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._db.findOne({ userName });
            return yield user.generateAuthToken();
        });
    }
    comparePassword(userName, plainPass) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._db.findOne({ userName });
            return yield user.comparePassHash(plainPass);
        });
    }
    getAllMangagers() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_2.FAKE_ALL_MANAGERS;
        });
    }
    resetPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._db.findOneAndUpdate({ id }, password);
        });
    }
}
module.exports = new UserRepository();
//# sourceMappingURL=UserRepository.js.map