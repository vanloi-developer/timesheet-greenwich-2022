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
const BaseErrorDto_1 = require("../dto/resDto/BaseErrorDto");
const generateID_1 = __importDefault(require("../utils/generateID"));
const TaskRepository_1 = __importDefault(require("../repositories/TaskRepository"));
class TaskService {
    constructor() {
        this._repository = TaskRepository_1.default;
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const taskInfo = req.body;
            // Task name quang already existed
            try {
                //Check if task existed
                const exitstedTask = yield this._repository.findByName(taskInfo.name);
                if (exitstedTask)
                    return res.status(500).json((0, BaseErrorDto_1.baseError)(`Task ${exitstedTask.name} already existed`));
                const id = (0, generateID_1.default)('task');
                taskInfo.id = id;
                const result = yield this._repository.create(taskInfo);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('createTask TaskService error: ', error.message);
                next(error);
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._repository.findAll();
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getAll TaskService error: ', error.message);
                next(error);
            }
        });
        this.UpdateBase = (updatefield) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = yield this._repository.findById(req.body.id);
                    if (!data)
                        return res.status(500).json(BaseErrorDto_1.NOT_EXIST_TASK);
                    const result = yield this._repository.update(req.body.id, updatefield ? updatefield : req.body);
                    return res.status(200).json(Object.assign({}, BaseResDto_1.BaseResDto));
                }
                catch (error) {
                    logger_1.default.error('createUser UserService error: ', error.message);
                    next(error);
                }
            });
        };
        this.deArchive = this.UpdateBase({ isDeleted: false });
        this.archive = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.query.Id);
            try {
                const data = yield this._repository.findById(id);
                if (!data)
                    return res.status(500).json(BaseErrorDto_1.NOT_EXIST_TASK);
                console.log(data);
                const result = yield this._repository.update(id, { isDeleted: true });
                return res.status(200).json(Object.assign({}, BaseResDto_1.BaseResDto));
            }
            catch (error) {
                logger_1.default.error('createUser UserService error: ', error.message);
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.query.Id);
            try {
                const data = yield this._repository.findById(id);
                if (!data)
                    return res.status(500).json(BaseErrorDto_1.NOT_EXIST_TASK);
                yield this._repository.deleteById(id);
                return res.status(200).json(Object.assign({}, BaseResDto_1.BaseResDto));
            }
            catch (error) {
                logger_1.default.error('createUser UserService error: ', error.message);
                next(error);
            }
        });
    }
}
module.exports = new TaskService();
//# sourceMappingURL=TaskService.js.map