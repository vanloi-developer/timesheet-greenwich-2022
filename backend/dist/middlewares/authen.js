"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authen = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../config/logger"));
const BaseResDto_1 = require("../dto/BaseResDto");
const dotenv_1 = __importDefault(require("dotenv"));
const BaseErrorDto_1 = require("../dto/BaseErrorDto");
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY;
const fakeData = {
    error: {
        code: 0,
        details: 'Invalid user name or password',
        message: 'Login failed!',
        validationErrors: null,
        result: null,
    },
    success: false,
    targetUrl: null,
    unAuthorizedRequest: false,
};
const authen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers['authorization'])
        return res.status(200).json(Object.assign({}, BaseErrorDto_1.AUTH_ERR));
    const token = req.headers['authorization'].split(' ')[1];
    try {
        const decoded = yield jsonwebtoken_1.default.verify(token, JWT_KEY);
        req.locals = decoded;
        next();
    }
    catch (ex) {
        logger_1.default.error('Authentication middleware false: ', ex.message);
        res.status(400).json(Object.assign(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), BaseErrorDto_1.INVALID_TOKEN), { success: false }));
    }
});
exports.authen = authen;
//# sourceMappingURL=authen.js.map