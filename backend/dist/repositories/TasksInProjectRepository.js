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
const BaseRepository_1 = require("./base/BaseRepository");
class TasksInProjectRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.default.Tasks_in_project, 'TasksInProjectRepository');
    }
    createMany(tasksInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.insertMany(tasksInput);
        });
    }
    findTasksInProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.find({ projectId }).select('-_id');
        });
    }
    deleteMany(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.deleteMany({ projectId });
        });
    }
    updateMany(tasksInput, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.updateMany({ projectId }, tasksInput, {
                upsert: true,
                setDefaultsOnInsert: true,
            });
        });
    }
}
module.exports = new TasksInProjectRepository();
//# sourceMappingURL=TasksInProjectRepository.js.map