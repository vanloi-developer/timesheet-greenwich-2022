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
const BaseErrorDto_1 = require("./../dto/resDto/BaseErrorDto");
const RoleRepository_1 = __importDefault(require("../repositories/RoleRepository"));
const logger_1 = __importDefault(require("../config/logger"));
const generateID_1 = __importDefault(require("../utils/generateID"));
class RoleService {
    constructor() {
        this._repository = RoleRepository_1.default;
        this.findAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._repository.findAll();
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getRoles RoleService error: ', error.message);
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const roleInput = Object.assign({}, req.body);
            try {
                //Check if task name exist
                const name = roleInput.name;
                const exitstedTask = yield this._repository.findOne({ name });
                if (exitstedTask)
                    return res.status(500).json((0, BaseErrorDto_1.baseError)(`Role ${exitstedTask.name} already existed`));
                //Auto generate id and normalizedName
                const id = (0, generateID_1.default)('role');
                roleInput.id = id;
                roleInput.normalizedName = roleInput.name.toUpperCase();
                const result = yield this._repository.create(roleInput);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('createRole RoleService error: ', error.message);
                next(error);
            }
        });
        this.filterAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const Keyword = String(req.query.Keyword);
            const SkipCount = Number(req.query.SkipCount);
            const MaxResultCount = Number(req.query.MaxResultCount);
            try {
                const result = yield this._repository.filterAll(Keyword, SkipCount, MaxResultCount);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getAll RoleService error: ', error.message);
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.query.Id);
            try {
                const data = yield this._repository.findOne({ id });
                if (!data)
                    return res.status(500).json(BaseErrorDto_1.NOT_EXIST_ROLE);
                yield this._repository.delete(id);
                return res.status(200).json(Object.assign({}, BaseResDto_1.BaseResDto));
            }
            catch (error) {
                logger_1.default.error('createUser UserService error: ', error.message);
                next(error);
            }
        });
    }
}
module.exports = new RoleService();
//# sourceMappingURL=RoleService.js.map