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
class MyTimesheetsRepository {
    constructor() {
        this._db = models_1.default.MyTimesheets;
    }
    filterByUserId(userId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.aggregate([
                    {
                        $match: {
                            userId,
                            dateAt: {
                                $gte: new Date(startDate),
                                $lt: new Date(endDate),
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: 'tasks_in_projects',
                            let: { projectTaskId: '$projectTaskId' },
                            as: 'tasks_in_project',
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ['$id', '$$projectTaskId'],
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: 'tasks',
                                        localField: 'taskId',
                                        foreignField: 'id',
                                        as: 'task',
                                    },
                                },
                                { $unwind: '$task' },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: 'tasks_in_projects',
                            let: { projectTaskId: '$projectTaskId' },
                            as: 'tasks_in_project',
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ['$id', '$$projectTaskId'],
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: 'tasks',
                                        localField: 'taskId',
                                        foreignField: 'id',
                                        as: 'task',
                                    },
                                },
                                {
                                    $lookup: {
                                        from: 'projects',
                                        let: { projectId: '$projectId' },
                                        as: 'project',
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ['$id', '$$projectId'],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: 'customers',
                                                    localField: 'customerId',
                                                    foreignField: 'id',
                                                    as: 'customer',
                                                },
                                            },
                                            { $unwind: '$customer' },
                                        ],
                                    },
                                },
                                { $unwind: '$project' },
                                { $unwind: '$task' },
                            ],
                        },
                    },
                    { $unwind: '$tasks_in_project' },
                    {
                        $project: {
                            id: '$id',
                            projectName: '$tasks_in_project.project.name',
                            taskName: '$tasks_in_project.task.name',
                            projectTaskId: '$projectTaskId',
                            customerName: '$tasks_in_project.project.customer.name',
                            projectCode: '$tasks_in_project.project.code',
                            dateAt: '$dateAt',
                            workingTime: '$workingTime',
                            status: '$status',
                            note: '$note',
                            typeOfWork: '$typeOfWork',
                            isCharged: '$isCharged',
                            billable: '$tasks_in_project.task.billable',
                        },
                    },
                ]);
            }
            catch (error) {
                logger_1.default.error('filterByUserId MyTimesheetsRepository error: ', error.message);
            }
        });
    }
    filterAll(status, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectUserModel = [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: 'id',
                            as: 'user',
                        },
                    },
                    { $unwind: '$user' },
                ];
                const connectTaskInProject = [
                    {
                        $lookup: {
                            from: 'tasks_in_projects',
                            let: { projectTaskId: '$projectTaskId' },
                            as: 'tasks_in_project',
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ['$id', '$$projectTaskId'],
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: 'tasks',
                                        localField: 'taskId',
                                        foreignField: 'id',
                                        as: 'task',
                                    },
                                },
                                {
                                    $lookup: {
                                        from: 'projects',
                                        let: { projectId: '$projectId' },
                                        as: 'project',
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ['$id', '$$projectId'],
                                                    },
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: 'customers',
                                                    localField: 'customerId',
                                                    foreignField: 'id',
                                                    as: 'customer',
                                                },
                                            },
                                            { $unwind: '$customer' },
                                        ],
                                    },
                                },
                                { $unwind: '$project' },
                                { $unwind: '$task' },
                            ],
                        },
                    },
                    { $unwind: '$tasks_in_project' },
                ];
                const reformatField = [
                    {
                        $project: {
                            id: '$id',
                            user: '$user.name',
                            userId: '$userId',
                            projectId: '$tasks_in_project.project.id',
                            projectName: '$tasks_in_project.project.name',
                            taskId: '$tasks_in_project.taskId',
                            taskName: '$tasks_in_project.task.name',
                            customerName: '$tasks_in_project.project.customer.name',
                            projectCode: '$tasks_in_project.project.code',
                            mytimesheetNote: '$note',
                            projectTaskId: '$projectTaskId',
                            dateAt: '$dateAt',
                            workingTime: '$workingTime',
                            status: '$status',
                            note: '$note',
                            type: '$typeOfWork',
                            isCharged: '$isCharged',
                            avatarPath: '$user.avatarPath',
                            level: '$user.level',
                        },
                    },
                ];
                const checkIfAnyUserInProject = [
                    {
                        $lookup: {
                            from: 'users_in_projects',
                            localField: 'projectId',
                            foreignField: 'projectId',
                            as: 'isUserInProject',
                        },
                    },
                ];
                const createFieldListPM = [
                    {
                        $lookup: {
                            from: 'users_in_projects',
                            let: { projectId: '$projectId' },
                            as: 'listPM',
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [{ $eq: ['$projectId', '$$projectId'] }, { $ne: ['$type', 3] }],
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
                        $set: {
                            listPM: '$listPM.name.name',
                            isUserInProject: { $size: '$isUserInProject' },
                        },
                    },
                ];
                const match = {
                    dateAt: {
                        $gte: new Date(startDate),
                        $lt: new Date(endDate),
                    },
                };
                if (status !== -1) {
                    match.status = status;
                }
                const filterExpression = [
                    {
                        $match: match,
                    },
                ];
                const allTimesheets = yield this._db.aggregate([
                    ...connectUserModel,
                    ...connectTaskInProject,
                    ...reformatField,
                    ...checkIfAnyUserInProject,
                    ...createFieldListPM,
                    ...filterExpression,
                ]);
                allTimesheets.forEach((item) => {
                    item.isUserInProject > 0
                        ? (item.isUserInProject = true)
                        : (item.isUserInProject = false);
                    item.branchName = 'Hà Nội';
                    item.branch = 0;
                });
                return allTimesheets;
            }
            catch (error) {
                logger_1.default.error('filterByUserId MyTimesheetsRepository error: ', error.message);
            }
        });
    }
    updateStatusByUserId(userId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timesheets = yield this._db.find({
                    userId,
                    dateAt: {
                        $gte: new Date(startDate),
                        $lt: new Date(endDate),
                    },
                    status: 0,
                });
                if (!timesheets.length)
                    return [];
                yield this._db.updateMany({
                    userId,
                    dateAt: {
                        $gte: new Date(startDate),
                        $lt: new Date(endDate),
                    },
                    status: 0,
                }, { status: 1 });
                return timesheets.length;
            }
            catch (error) {
                logger_1.default.error('findAndSumit MyTimesheetsRepository error: ', error.message);
            }
        });
    }
    updateManyStatus(myTimesheetIds, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._db.updateMany({
                    id: { $in: myTimesheetIds },
                }, { status });
            }
            catch (error) {
                logger_1.default.error('findAndSumit MyTimesheetsRepository error: ', error.message);
            }
        });
    }
    create(myTimesheetsInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._db.create(myTimesheetsInput);
            }
            catch (error) {
                logger_1.default.error('create MyTimesheetsRepository error: ', error.message);
            }
        });
    }
}
module.exports = new MyTimesheetsRepository();
//# sourceMappingURL=MyTimessheetsRepository.js.map