import UserRouter = require('./UserRouter');
import { BaseRouter } from './BaseRouter';
import WorkTimeService = require('../services/WorkTimeService');
import CustomerRouter = require('./CustomerRouter');
import TaskRouter = require('./TaskRouter');
import RoleRouter = require('./RoleRouter');
import ProjectRouter = require('./ProjectRouter');

class AppRouter extends BaseRouter {
   private _worktimeService = WorkTimeService;

   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get(
         '/Configuration/GetWorkingTimeConfigAllBranch',
         this._worktimeService.worktime,
      );

      this.router.use('/User', UserRouter);
      this.router.use('/Role', RoleRouter);
      this.router.use('/Customer', CustomerRouter);
      this.router.use('/Task', TaskRouter);
      this.router.use('/Project', ProjectRouter);
   }
}

export = new AppRouter().router;
