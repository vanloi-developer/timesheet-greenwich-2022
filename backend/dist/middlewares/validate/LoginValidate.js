"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validLogin = void 0;
const BaseResDto_1 = require("../../dto/BaseResDto");
const BaseErrorDto_1 = require("../../dto/BaseErrorDto");
const REQUIRED_FIELD = ['password', 'userNameOrEmailAddress'];
const validLogin = (req, res, next) => {
    const data = Object.assign({}, req.body);
    let details = BaseErrorDto_1.INVALID_REQUEST.error.details;
    let validationErrors = [];
    const { emailAddress } = data;
    // Check missing required field
    const invalidField = checkField(REQUIRED_FIELD);
    if (invalidField)
        return res.status(400).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { error: Object.assign({}, invalidField) }));
    next();
    function checkField(arr) {
        arr.forEach((item) => {
            if (!data[item])
                errorMess(item);
        });
        if (validationErrors.length)
            return Object.assign(Object.assign({}, BaseErrorDto_1.INVALID_REQUEST), { details, validationErrors });
        return false;
    }
    function errorMess(field, errmess = 'field is required') {
        let error = {
            message: `The ${upperFirstChar(field)} ${errmess}.`,
            members: [field],
        };
        // If invalidate. Create error messages and details
        validationErrors.push(error);
        details += `- ${error.message} .\r\n `;
        function upperFirstChar(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    }
};
exports.validLogin = validLogin;
//# sourceMappingURL=LoginValidate.js.map