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
class TasksInProjectRepository {
    constructor() {
        this._db = models_1.default.Tasks_in_project;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.findOne({ id }).select('-_id');
            }
            catch (err) {
                logger_1.default.error('findByName TasksInProjectRepository error: ', err.message);
            }
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.findOne({ name }).select('-_id');
            }
            catch (err) {
                logger_1.default.error('findByName TasksInProjectRepository error: ', err.message);
            }
        });
    }
    createMany(tasksInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.insertMany(tasksInput);
            }
            catch (error) {
                logger_1.default.error('create TasksInProjectRepository error: ', error.message);
            }
        });
    }
    findTasksInProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.find({ projectId }).select('-_id');
            }
            catch (err) {
                logger_1.default.error('findTaskInProject TasksInProjectRepository error: ', err.message);
            }
        });
    }
    deleteMany(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.deleteMany({ projectId });
            }
            catch (err) {
                logger_1.default.error('findTaskInProject TasksInProjectRepository error: ', err.message);
            }
        });
    }
    updateMany(tasksInput, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.updateMany({ projectId }, tasksInput, {
                    upsert: true,
                    setDefaultsOnInsert: true,
                });
            }
            catch (error) {
                logger_1.default.error('create TasksInProjectRepository error: ', error.message);
            }
        });
    }
}
module.exports = new TasksInProjectRepository();
//# sourceMappingURL=TasksInProjectRepository.js.map