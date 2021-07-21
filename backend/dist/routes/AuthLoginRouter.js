"use strict";
const express_1 = require("express");
const fakeData = {
    result: {
        application: {
            version: "4.3.0.0",
            releaseDate: "2021-07-20T15:49:07.1350156+07:00",
            features: {},
        },
        user: null,
        tenant: null,
    },
    targetUrl: null,
    success: true,
    error: null,
    unAuthorizedRequest: false,
    __abp: true,
};
/**
 * @description AuthLoginRouter
 */
class AuthLoginRouter {
    constructor() {
        this._router = express_1.Router();
        this.init();
    }
    get router() {
        return this._router;
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this._router.get("/Session/GetCurrentLoginInformations", (req, res, next) => {
            res.status(200).json(fakeData);
        });
    }
}
module.exports = new AuthLoginRouter().router;
//# sourceMappingURL=AuthLoginRouter.js.map