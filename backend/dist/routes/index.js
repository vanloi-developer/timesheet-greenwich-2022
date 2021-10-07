"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const error_1 = require("./../middlewares/error");
const ApiRouter_1 = __importDefault(require("./ApiRouter"));
const BaseRouter_1 = require("./BaseRouter");
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const path = require("path");
class IndexRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.configure();
        this.init();
    }
    configure() {
        this.router.use(cors());
        this.router.use(express_1.default.json());
        this.router.use(express_1.default.urlencoded({ extended: true }));
        this.router.use(express_1.default.static(path.resolve('../frontend')));
        this.router.use(express_1.default.static(path.resolve('src/public')));
    }
    //Manage all routes
    init() {
        this.router.use('/api', ApiRouter_1.default);
        this.router.use(error_1.error);
    }
}
module.exports = new IndexRouter().router;
//# sourceMappingURL=index.js.map