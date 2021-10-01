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
// import { ITaskFilterOpt } from './../types/ICustomFilterOpt';
const index_1 = require("./../utils/index");
const index_2 = require("./../constants/index");
const models_1 = __importDefault(require("../models"));
const logger_1 = __importDefault(require("../config/logger"));
class TaskRepository {
    constructor() {
        this._db = models_1.default.Task;
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.findOne({ name }).select('-_id');
            }
            catch (error) {
                logger_1.default.error('findByName TaskRepository error: ', error.message);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.find({}).select('-_id');
            }
            catch (error) {
                logger_1.default.error('findByName TaskRepository error: ', error.message);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.findOne({ id }).select('-_id');
            }
            catch (error) {
                logger_1.default.error('findByName TaskRepository error: ', error.message);
            }
        });
    }
    create(taskInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.create(taskInfo);
            }
            catch (error) {
                logger_1.default.error('create TaskRepository error: ', error.message);
            }
        });
    }
    filterUserPagging(filterItems, maxResultCount, skipCount, searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            // Option must have in search
            let filterOpt = filterItems.length
                ? filterItems.map((item) => ({
                    [item.propertyName]: item.value,
                }))
                : [];
            //Search with name | username ... text
            if (searchText && searchText !== '') {
                let orOpt = (0, index_1.searchTextFieldOpt)(searchText, index_2.REQUIRED_FIELD_SAVE_CUSTOMER);
                if (orOpt.length)
                    filterOpt.push({ $or: orOpt });
            }
            try {
                const findOpt = filterOpt.length ? { $and: filterOpt } : {};
                const items = yield this._db.find(findOpt).skip(skipCount).limit(maxResultCount);
                return {
                    totalCount: items.length,
                    items,
                };
            }
            catch (error) {
                logger_1.default.error('findUserPagging CutomerRepository error: ', error.message);
            }
        });
    }
    update(id, updateFeild) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._db.findOneAndUpdate({ id }, updateFeild);
            }
            catch (error) {
                logger_1.default.error('findByID UserRepository error: ', error.message);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._db.deleteOne({ id });
            }
            catch (error) {
                logger_1.default.error('DeleteUserById UserRepository error: ', error.message);
            }
        });
    }
}
module.exports = new TaskRepository();
//# sourceMappingURL=TaskRepository.js.map