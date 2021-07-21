"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const TestService_1 = __importDefault(require("../services/test/TestService"));
/**
 * @description TestRouter.
 */
class TestRouter {
    constructor() {
        this._router = express_1.Router();
        this._service = TestService_1.default;
        this.init();
    }
    get router() {
        return this._router;
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this._router.get('/', (req, res, next) => {
            res.status(200).json(this._service.defaultMethod());
        });
    }
}
module.exports = new TestRouter().router;
//# sourceMappingURL=TestRouter.js.map