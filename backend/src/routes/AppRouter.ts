import { authen } from './../middlewares/authen';
import UserRouter = require('./UserRouter');
import { BaseRouter } from './BaseRouter';
import UserService = require('../services/UserService');
import WorkTimeService = require('../services/WorkTimeService');
import CustomerRouter = require('./CustomerRouter');

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

      this.router.use('/User', authen, UserRouter);
      this.router.use('/Customer', authen, CustomerRouter);
   }
}

export = new AppRouter().router;
