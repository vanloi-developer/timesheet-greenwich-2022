"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authen = void 0;
const fakeData = {
    error: {
        code: 0,
        details: "Invalid user name or password",
        message: "Login failed!",
        validationErrors: null,
        result: null,
    },
    success: false,
    targetUrl: null,
    unAuthorizedRequest: false,
};
const authen = (req, res, next) => {
    // console.log("ping");
    // res.status(200).json(fakeData);
    next();
};
exports.authen = authen;
//# sourceMappingURL=authen.js.map