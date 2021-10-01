"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_1 = require("./../middlewares/auth");
const FieldValidate_1 = require("../middlewares/validate/FieldValidate");
const FieldValidate_2 = require("../middlewares/validate/FieldValidate");
const ProjectService_1 = __importDefault(require("../services/ProjectService"));
const BaseRouter_1 = require("./BaseRouter");
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