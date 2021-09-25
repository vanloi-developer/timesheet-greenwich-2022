"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const BaseErrorDto_1 = require("../../dto/BaseErrorDto");
const REQUIRED_FIELD = ['name', 'surname', 'userName', 'emailAddress'];
const createUser = (req, res, next) => {
    const data = Object.assign({}, req.body);
    const { emailAddress } = data;
    BaseErrorDto_1.INVALID_REQUEST.error.validationErrors = [];
    // Check missing required field
    const invalidField = checkField(REQUIRED_FIELD);
    const invalidEmail = checkFormatEmail(emailAddress);
    if (invalidField)
        return res.status(400).json(Object.assign({}, invalidField));
    if (invalidEmail)
        return res.status(400).json(Object.assign({}, invalidEmail));
    next();
    function checkField(arr) {
        arr.forEach((item) => {
            if (!data[item])
                errorMess(item);
        });
        if (BaseErrorDto_1.INVALID_REQUEST.error.validationErrors.length)
            return Object.assign({}, BaseErrorDto_1.INVALID_REQUEST);
        return false;
    }
    function checkFormatEmail(emailAddress) {
        if (!emailAddress.includes('@')) {
            errorMess('emailAddress', 'field is not a valid e-mail address');
            return Object.assign({}, BaseErrorDto_1.INVALID_REQUEST);
        }
        return false;
    }
    function errorMess(field, errmess = 'field is required') {
        let error = {
            message: `The ${upperFirstChar(field)} ${errmess}.`,
            members: [field],
        };
        // If invalidate. Create error messages and details
        BaseErrorDto_1.INVALID_REQUEST.error.validationErrors.push(error);
        BaseErrorDto_1.INVALID_REQUEST.error.details += `- ${error.message} .\r\n `;
        function upperFirstChar(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    }
};
exports.createUser = createUser;
//# sourceMappingURL=UserValidate.js.map