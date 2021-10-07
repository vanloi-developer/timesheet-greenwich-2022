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
const ProjectRepository_1 = __importDefault(require("../repositories/ProjectRepository"));
const logger_1 = __importDefault(require("../config/logger"));
const generateID_1 = __importDefault(require("../utils/generateID"));
const UsersInProjectRepository_1 = __importDefault(require("../repositories/UsersInProjectRepository"));
class ProjectService {
    constructor() {
        this._repository = ProjectRepository_1.default;
        this._userInProjectRepository = UsersInProjectRepository_1.default;
        this.getById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.query.input);
            try {
                const result = yield this._repository.findOne({ id });
                if (!result)
                    return res.status(500).json(Object.assign({}, BaseErrorDto_1.NOT_EXIST_PROJECT));
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result: result[0] }));
            }
            catch (error) {
                logger_1.default.error('getAll ProjectService error: ', error.message);
                next(error);
            }
        });
        this.getProjectsIncludingTasks = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // const userId: number = req.local.id;/
            const userId = 6;
            let result = [];
            try {
                const projectIds = yield this._userInProjectRepository.findProjectIds(userId);
                if (!projectIds.length)
                    return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
                result = yield this._repository.findProjectsIncludingTasks(projectIds, userId);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getAll ProjectService error: ', error.message);
                next(error);
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const status = req.query.status !== undefined ? Number(req.query.status) : null;
            const search = String(req.query.search);
            try {
                const result = yield this._repository.filterAll(status, search);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getAll ProjectService error: ', error.message);
                next(error);
            }
        });
        this.createOrEdit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const projectInput = Object.assign({}, req.body);
            try {
                // Check if email or username exist
                if (projectInput.id) {
                    let result = yield this._repository.updateWithUserAndTask(projectInput);
                    return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
                }
                const name = projectInput.name;
                const exitedName = yield this._repository.findOne({ name });
                if (exitedName)
                    return res.status(200).json(BaseErrorDto_1.EXISTED_PROJECT);
                //Auto generate id
                const id = (0, generateID_1.default)('project');
                projectInput.id = id;
                let result = yield this._repository.createOrUpdate(projectInput);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('createproject projectService error: ', error.message);
                next(error);
            }
        });
        this.UpdateBase = (updatefield) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const id = req.body.id;
                    const data = yield this._repository.findOne({ id });
                    if (!data)
                        return res.status(500).json(BaseErrorDto_1.NOT_EXIST_PROJECT);
                    yield this._repository.update(req.body.id, updatefield ? updatefield : req.body);
                    return res.status(200).json(BaseResDto_1.BaseResDto);
                }
                catch (error) {
                    logger_1.default.error('createUser UserService error: ', error.message);
                    next(error);
                }
            });
        };
        this.inactive = this.UpdateBase({ status: 1 });
        this.active = this.UpdateBase({ status: 0 });
        this.deleteById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.query.Id);
            try {
                const data = yield this._repository.findOne({ id });
                if (!data)
                    return res.status(500).json(BaseErrorDto_1.NOT_EXIST_PROJECT);
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
module.exports = new ProjectService();
//# sourceMappingURL=ProjectService.js.map