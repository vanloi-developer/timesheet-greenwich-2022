import UserRouter = require('./UserRouter');
import { BaseRouter } from './BaseRouter';
import UserService = require('../services/UserService');
import WorkTimeService = require('../services/WorkTimeService');
import CustomerRouter = require('./CustomerRouter');
import TaskRouter = require('./TaskRouter');
import RoleRouter = require('./RoleRouter');

class AppRouter extends BaseRouter {
   private _userService = UserService;
   private _worktimeService = WorkTimeService;

   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get('/Session/GetCurrentLoginInformations', this._userService.getUserLoginInfo);
      this.router.get(
         '/Configuration/GetWorkingTimeConfigAllBranch',
         this._worktimeService.worktime,
      );

      this.router.use('/User', UserRouter);
      this.router.use('/Customer', CustomerRouter);
      this.router.use('/Task', TaskRouter);
      this.router.use('/Role', RoleRouter);
   }
}

export = new AppRouter().router;
