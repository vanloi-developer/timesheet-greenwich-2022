"use strict";
var __importDefault =
   (this && this.__importDefault) ||
   function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
   };
const AuthLoginRouter_1 = __importDefault(require("./AuthLoginRouter"));
const BaseRouter_1 = require("./BaseRouter");
const TestRouter_1 = __importDefault(require("./TestRouter"));
const bodyParser = require("body-parser");
const cors = require("cors");
class ApiRouter extends BaseRouter_1.BaseRouter {
   constructor() {
      super();
      this.configure();
      this.init();
   }
   configure() {
      // define onfigurations
      this.router.use(cors());
      this.router.use(bodyParser.json()); // to support JSON-encoded bodies
      this.router.use(
         bodyParser.urlencoded({
            // to support URL-encoded bodies
            extended: true,
         })
      );
   }
   /**
    * Connect routes to their matching routers.
    */
   init() {
      this.router.use("/test", TestRouter_1.default);
      this.router.use("/services/app", AuthLoginRouter_1.default);
   }
}
module.exports = new ApiRouter().router;
//# sourceMappingURL=ApiRouter.js.map
