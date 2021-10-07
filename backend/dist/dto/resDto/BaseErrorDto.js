"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_EXIST_PROJECT = exports.NOT_EXIST_ROLE = exports.NOT_EXIST_TASK = exports.NOT_EXIST_CUSTOMERS = exports.NOT_EXIST_USER = exports.WRONG_ADMIN_PASS = exports.LOGIN_FAILED = exports.INVALID_REQUEST = exports.SERVER_ERROR = exports.AUTHOR_ERR = exports.AUTHEN_ERR = exports.EXISTED_PROJECT = exports.EXISTED_USER = exports.INVALID_TOKEN = exports.baseError = void 0;
const BaseResDto_1 = require("./BaseResDto");
const BaseErrorDto = (message = null, details = null) => {
    return Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { error: {
            code: 0,
            message,
            details,
            validationErrors: null,
        }, success: false });
};
exports.baseError = BaseErrorDto;
exports.INVALID_TOKEN = BaseErrorDto('Your request is not valid!', 'Invalid token');
exports.EXISTED_USER = BaseErrorDto('is already taken.');
exports.EXISTED_PROJECT = BaseErrorDto('Project name is already taken.');
exports.AUTHEN_ERR = BaseErrorDto('Current user did not login to the application!');
exports.AUTHOR_ERR = BaseErrorDto('Current user did not have permissions to access this feature!');
exports.SERVER_ERROR = BaseErrorDto('An internal error occurred during your request!');
exports.INVALID_REQUEST = BaseErrorDto('Your request is not valid!', 'The following errors were detected during validation.\r\n ');
exports.LOGIN_FAILED = BaseErrorDto('Login failed!', 'Invalid user name or password');
exports.WRONG_ADMIN_PASS = BaseErrorDto(`Your 'Admin Password' did not match the one on record.  Please try again.`);
exports.NOT_EXIST_USER = BaseErrorDto('User not exist');
exports.NOT_EXIST_CUSTOMERS = BaseErrorDto('Cutomers not exist');
exports.NOT_EXIST_TASK = BaseErrorDto('Task not exist');
exports.NOT_EXIST_ROLE = BaseErrorDto('Role not exist');
exports.NOT_EXIST_PROJECT = BaseErrorDto('Project not exist');
//# sourceMappingURL=BaseErrorDto.js.map