import { authen } from './../middlewares/authen';
import { REQUIRED_FIELD_LOGIN } from './../constants/index';
import { validate } from './../middlewares/validate/FieldValidate';
import appRouter from './AppRouter';
import { BaseRouter } from './BaseRouter';
import authenService from '../services/AuthenService';
import UserService from '../services/UserService';

class ApiRouter extends BaseRouter {
   private _userService = UserService;
   private _authenService = authenService;

   constructor() {
      super();
      this.init();
   }

   /**
    * Connect routes to their matching routers.
    */
   protected init() {
      // this.router.use("/test", testRouter);
      this.router.get(
         '/services/app/Session/GetCurrentLoginInformations',
         this._userService.getUserLoginInfo,
      );
      this.router.post(
         '/TokenAuth/Authenticate',
         validate(REQUIRED_FIELD_LOGIN),
         this._authenService.authen,
      );

      this.router.use('/services/app', authen, appRouter);
   }
}

export = new ApiRouter().router;
