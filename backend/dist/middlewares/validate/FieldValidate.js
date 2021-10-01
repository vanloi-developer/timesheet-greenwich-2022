"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validQueryInput = exports.validQueryID = exports.validate = void 0;
const BaseErrorDto_1 = require("./../../dto/resDto/BaseErrorDto");
const validate = (requestFeild) => {
    return (req, res, next) => {
        const data = Object.assign({}, req.body);
        const REQUIRED_FIELD = requestFeild;
        const INVALID_ERR = Object.assign({}, BaseErrorDto_1.INVALID_REQUEST);
        INVALID_ERR.error.validationErrors = [];
        const { emailAddress } = data;
        // Check missing required field
        const invalidField = checkField(REQUIRED_FIELD);
        if (invalidField)
            return res.status(400).json(INVALID_ERR);
        next();
        function checkField(arr) {
            arr.forEach((item) => {
                if (data[item] === undefined)
                    errorMess(item);
            });
            if (INVALID_ERR.error.validationErrors.length)
                return true;
            return false;
        }
        function errorMess(field, errmess = 'field is required') {
            let error = {
                message: `The ${upperFirstChar(field)} ${errmess}.`,
                members: [field],
            };
            // If invalidate. Create error messages and details
            INVALID_ERR.error.validationErrors.push(error);
            INVALID_ERR.error.details += `- ${error.message} .\r\n `;
            function upperFirstChar(text) {
                return text.charAt(0).toUpperCase() + text.slice(1);
            }
        }
    };
};
exports.validate = validate;
const validQueryID = (req, res, next) => {
    if (!req.query.Id)
        return res.status(400).json(BaseErrorDto_1.INVALID_REQUEST);
    next();
};
exports.validQueryID = validQueryID;
const validQueryInput = (req, res, next) => {
    if (!req.query.input)
        return res.status(400).json(BaseErrorDto_1.INVALID_REQUEST);
    next();
};
exports.validQueryInput = validQueryInput;
//# sourceMappingURL=FieldValidate.js.map