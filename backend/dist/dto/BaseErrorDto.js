"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN_FAILED = exports.INVALID_REQUEST = exports.SERVER_ERROR = exports.AUTH_ERR = exports.EXISTED_USER = exports.INVALID_TOKEN = exports.BaseError = void 0;
const BaseResDto_1 = require("./BaseResDto");
const BaseErrorDto = (message = null, details = null) => {
    return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { error: {
            code: 0,
            message,
            details,
            validationErrors: null,
        }, success: false });
};
exports.BaseError = BaseErrorDto();
exports.INVALID_TOKEN = BaseErrorDto('Your request is not valid!', 'Invalid token');
exports.EXISTED_USER = BaseErrorDto('is already taken.');
exports.AUTH_ERR = BaseErrorDto('Current user did not login to the application!');
exports.SERVER_ERROR = BaseErrorDto('An internal error occurred during your request!');
exports.INVALID_REQUEST = BaseErrorDto('Your request is not valid!', 'The following errors were detected during validation.\r\n ');
exports.LOGIN_FAILED = BaseErrorDto('Login failed!', 'Invalid user name or password');
//# sourceMappingURL=BaseErrorDto.js.map