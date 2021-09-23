import authLoginRouter from "./AuthLoginRouter";
import { BaseRouter } from "./BaseRouter";
import testRouter from "./TestRouter";
import bodyParser = require("body-parser");
import cors = require("cors");

class ApiRouter extends BaseRouter {
   constructor() {
      super();
      this.init();
   }

   /**
    * Connect routes to their matching routers.
    */
   protected init() {
      this.router.use("/test", testRouter);
      this.router.use("/services/app", authLoginRouter);
   }
}

export = new ApiRouter().router;
