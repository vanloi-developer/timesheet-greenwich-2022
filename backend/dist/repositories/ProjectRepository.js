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
const index_1 = require("./../constants/index");
const index_2 = require("./../utils/index");
const generateID_1 = __importDefault(require("../utils/generateID"));
const models_1 = __importDefault(require("../models"));
const UsersInProjectRepository_1 = __importDefault(require("./UsersInProjectRepository"));
const TasksInProjectRepository_1 = __importDefault(require("./TasksInProjectRepository"));
const BaseRepository_1 = require("./base/BaseRepository");
class ProjectRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.default.Project, 'ProjectRepository');
    }
    createOrUpdate(projectInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tasks, users } = projectInput;
            tasks.forEach((item) => {
                if (item.id === undefined)
                    item.id = (0, generateID_1.default)('tasks_in_project');
                if (item.projectId === undefined)
                    item.projectId = projectInput.id;
            });
            users.forEach((item) => {
                if (item.id === undefined)
                    item.id = (0, generateID_1.default)('tasks_in_project');
                if (item.projectId === undefined)
                    item.projectId = projectInput.id;
            });
            delete projectInput['tasks'];
            delete projectInput['users'];
            const project = yield this._db.findOneAndUpdate({ id: projectInput.id }, projectInput, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            });
            const createdTasks = yield TasksInProjectRepository_1.default.createMany(tasks);
            const createdUsers = yield UsersInProjectRepository_1.default.createMany(users);
            let result = Object.assign(Object.assign({}, project), { tasks: createdTasks, users: createdUsers });
            return result;
        });
    }
    filterAll(status, search) {
        return __awaiter(this, void 0, void 0, function* () {
            // Search with name | username ... text
            const searchFilter = [];
            let match = [];
            if (status !== null)
                match.push({ status });
            if (search)
                match.push({ $or: (0, index_2.searchTextFieldOpt)(search, index_1.SEARCH_TEXT_FIELD_PROJECTS) });
            if (match.length)
                searchFilter.push({ $match: { $and: match } });
            const customerNameQuery = [
                {
                    $lookup: {
                        from: 'customers',
                        localField: 'customerId',
                        foreignField: 'id',
                        as: 'customerName',
                    },
                },
                { $unwind: '$customerName' },
            ];
            const activeMemberQuery = [
                {
                    $lookup: {
                        from: 'users_in_projects',
                        let: { id: '$id' },
                        as: 'activeMember',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [{ $eq: ['$projectId', '$$id'] }, { $ne: ['$type', 3] }],
                                    },
                                },
                            },
                        ],
                    },
                },
            ];
            const projectManagersQuery = [
                {
                    $lookup: {
                        from: 'users_in_projects',
                        let: { id: '$id' },
                        as: 'pms',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [{ $eq: ['$projectId', '$$id'] }, { $ne: ['$type', 3] }],
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: 'users',
                                    let: { userId: '$userId', type: '$type' },
                                    as: 'name',
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [{ $eq: ['$id', '$$userId'] }, { $eq: ['$$type', 1] }],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                name: { $concat: ['$name', ' ', '$surname'] },
                                            },
                                        },
                                    ],
                                },
                            },
                            { $unwind: '$name' },
                        ],
                    },
                },
            ];
            const formatReturnFields = [
                {
                    $project: {
                        id: '$id',
                        customerName: '$customerName.name',
                        name: '$name',
                        code: '$code',
                        status: '$status',
                        pms: '$pms.name.name',
                        activeMember: { $size: '$activeMember' },
                        projectType: '$projectType',
                        timeStart: '$timeStart',
                        timeEnd: '$timeEnd',
                    },
                },
            ];
            const filterOpt = [
                ...customerNameQuery,
                ...activeMemberQuery,
                ...projectManagersQuery,
                ...formatReturnFields,
                ...searchFilter,
            ];
            return yield this._db.aggregate(filterOpt);
        });
    }
    findProjectsIncludingTasks(projectIds, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.aggregate([
                { $match: { id: { $in: projectIds } } },
                {
                    $lookup: {
                        from: 'tasks_in_projects',
                        let: { id: '$id' },
                        as: 'tasks',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$projectId', '$$id'],
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: 'tasks',
                                    localField: 'taskId',
                                    foreignField: 'id',
                                    as: 'taskName',
                                },
                            },
                            { $unwind: '$taskName' },
                            {
                                $project: {
                                    _id: 0,
                                    projectTaskId: '$id',
                                    taskName: '$taskName.name',
                                    billable: '$billable',
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'users_in_projects',
                        let: { id: '$id' },
                        as: 'projectUserType',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [{ $eq: ['$projectId', '$$id'] }, { $eq: ['$userId', userId] }],
                                    },
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    userId: '$userId',
                                    type: '$type',
                                    id: '$id',
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'users_in_projects',
                        let: { id: '$id' },
                        as: 'listPM',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [{ $eq: ['$projectId', '$$id'] }, { $ne: ['$type', 3] }],
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: 'users',
                                    let: { userId: '$userId', type: '$type' },
                                    as: 'name',
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [{ $eq: ['$id', '$$userId'] }, { $eq: ['$$type', 1] }],
                                                },
                                            },
                                        },
                                        {
                                            $project: {
                                                name: { $concat: ['$name', ' ', '$surname'] },
                                            },
                                        },
                                    ],
                                },
                            },
                            { $unwind: '$name' },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'customers',
                        localField: 'customerId',
                        foreignField: 'id',
                        as: 'customerName',
                    },
                },
                { $unwind: '$customerName' },
                { $unwind: '$projectUserType' },
                {
                    $project: {
                        _id: 0,
                        projectName: '$name',
                        customerName: '$customerName.name',
                        projectCode: '$code',
                        projectUserType: '$projectUserType.type',
                        listPM: '$listPM.name.name',
                        tasks: '$tasks',
                        targetUsers: '$projectTargetUsers',
                        id: '$id',
                    },
                },
            ]);
        });
    }
    updateWithUserAndTask(projectInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectId = projectInput.id;
            yield UsersInProjectRepository_1.default.deleteMany(projectId);
            yield TasksInProjectRepository_1.default.deleteMany(projectId);
            return yield this.createOrUpdate(projectInput);
        });
    }
}
module.exports = new ProjectRepository();
//# sourceMappingURL=ProjectRepository.js.map