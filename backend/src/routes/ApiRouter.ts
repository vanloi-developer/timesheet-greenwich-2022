import { validLogin } from '../middlewares/validate/FieldValidate';
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
      this.router.use('/services/app', appRouter);

      this.router.post('/TokenAuth/Authenticate', validLogin, authenService.authen);
   }
}

export = new ApiRouter().router;
