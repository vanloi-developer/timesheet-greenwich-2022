"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_1 = require("./../middlewares/auth");
const FieldValidate_1 = require("../middlewares/validate/FieldValidate");
const FieldValidate_2 = require("../middlewares/validate/FieldValidate");
const ProjectService_1 = __importDefault(require("../services/ProjectService"));
const BaseRouter_1 = require("./BaseRouter");
const FAKE_GetProjectsIncludingTasks = {
    result: [
        {
            projectName: 'test luong',
            customerName: 'NCC-Hanoi',
            projectCode: 'abcdef123',
            projectUserType: 0,
            listPM: ['Tien Nguyen Huu', 'qử qwe'],
            tasks: [
                { projectTaskId: 495, taskName: 'Tiến Ánh Phạm 157', billable: true },
                { projectTaskId: 496, taskName: 'svs', billable: true },
                { projectTaskId: 497, taskName: 'có xóa được', billable: true },
                { projectTaskId: 498, taskName: '321de222222', billable: true },
                { projectTaskId: 501, taskName: '1', billable: true },
                { projectTaskId: 499, taskName: 'done', billable: true },
                { projectTaskId: 502, taskName: 'Ánh nắng lấp lánh 2', billable: true },
                { projectTaskId: 500, taskName: 'comd', billable: true },
            ],
            targetUsers: [],
            id: 171,
        },
        {
            projectName: 'New-Project 2',
            customerName: 'NCC-Hanoi',
            projectCode: 'NCC-23082512',
            projectUserType: 2,
            listPM: ['Tien Nguyen Huu', 'Tien Pham'],
            tasks: [
                { projectTaskId: 443, taskName: 'cai gi 1234567', billable: true },
                { projectTaskId: 449, taskName: 'cái gì', billable: true },
                { projectTaskId: 444, taskName: 'Other Khong xoa duoc 6ádasdasd', billable: true },
                { projectTaskId: 445, taskName: 'svs', billable: true },
                { projectTaskId: 446, taskName: 'có xóa được', billable: true },
                { projectTaskId: 447, taskName: '321de222222', billable: true },
                { projectTaskId: 448, taskName: 'done', billable: true },
            ],
            targetUsers: [],
            id: 162,
        },
    ],
    targetUrl: null,
    success: true,
    error: null,
    unAuthorizedRequest: false,
    __abp: true,
};
class ProjectRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this._service = ProjectService_1.default;
        this.init();
    }
    init() {
        this.router.post('/Save', auth_1.authorAdmin, this._service.createOrEdit);
        this.router.post('/Inactive', auth_1.authorAdmin, (0, FieldValidate_2.validate)(['id']), this._service.inactive);
        this.router.post('/Active', auth_1.authorAdmin, (0, FieldValidate_2.validate)(['id']), this._service.active);
        this.router.get('/getAll', auth_1.authorAdmin, this._service.getAll);
        this.router.get('/Get', auth_1.authorAdmin, FieldValidate_1.validQueryInput, this._service.getById);
        this.router.get('/GetProjectsIncludingTasks', this._service.getProjectsIncludingTasks);
        this.router.delete('/Delete', FieldValidate_1.validQueryID, this._service.deleteById);
    }
}
module.exports = new ProjectRouter().router;
//# sourceMappingURL=ProjectRouter.js.map