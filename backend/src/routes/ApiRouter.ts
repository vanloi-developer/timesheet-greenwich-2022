import { REQUIRED_FIELD_LOGIN } from './../constants/index';
import { validate } from './../middlewares/validate/FieldValidate';
import { authen } from './../middlewares/authen';
import appRouter from './AppRouter';
import { BaseRouter } from './BaseRouter';
// import testRouter from './TestRouter';
import authenService from '../services/AuthenService';

class ApiRouter extends BaseRouter {
   constructor() {
      super();
      this.init();
   }

   /**
    * Connect routes to their matching routers.
    */
   protected init() {
      // this.router.use("/test", testRouter);
      this.router.use('/services/app', authen, appRouter);

      this.router.post(
         '/TokenAuth/Authenticate',
         validate(REQUIRED_FIELD_LOGIN),
         authenService.authen,
      );
   }
}

export = new ApiRouter().router;
