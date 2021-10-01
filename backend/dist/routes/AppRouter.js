"use strict";
const auth_1 = require("./../middlewares/auth");
const UserRouter = require("./UserRouter");
const BaseRouter_1 = require("./BaseRouter");
const WorkTimeService = require("../services/WorkTimeService");
const CustomerRouter = require("./CustomerRouter");
const TaskRouter = require("./TaskRouter");
const RoleRouter = require("./RoleRouter");
const ProjectRouter = require("./ProjectRouter");
const MyTimesheetsRouter = require("./MyTimesheetsRouter");
const TimekeepingRouter = require("./TimekeepingRouter");
const TimesheetsRouter = require("./TimesheetsRouter");
class AppRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this._worktimeService = WorkTimeService;
        this.init();
    }
    init() {
        this.router.get('/Configuration/GetWorkingTimeConfigAllBranch', this._worktimeService.worktime);
        this.router.use('/User', UserRouter);
        this.router.use('/Role', auth_1.authorAdmin, RoleRouter);
        this.router.use('/Customer', auth_1.authorAdmin, CustomerRouter);
        this.router.use('/Task', auth_1.authorAdmin, TaskRouter);
        this.router.use('/Project', ProjectRouter);
        this.router.use('/MyTimesheets', MyTimesheetsRouter);
        this.router.use('/Timesheet', auth_1.authorAdmin, TimesheetsRouter);
        this.router.use('/Timekeeping', TimekeepingRouter);
    }
}
module.exports = new AppRouter().router;
//# sourceMappingURL=AppRouter.js.map