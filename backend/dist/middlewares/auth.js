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
exports.authorAdmin = exports.authen = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../config/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const BaseErrorDto_1 = require("../dto/resDto/BaseErrorDto");
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY;
const authen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers['authorization'])
        return res.status(200).json(BaseErrorDto_1.AUTHEN_ERR);
    const token = req.headers['authorization'].split(' ')[1];
    try {
        const decoded = yield jsonwebtoken_1.default.verify(token, JWT_KEY);
        req.local = decoded;
        next();
    }
    catch (ex) {
        logger_1.default.error('Authentication middleware false: ', ex.message);
        res.status(400).json(BaseErrorDto_1.INVALID_TOKEN);
    }
});
exports.authen = authen;
const author = (ROLE_TYPE) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { roleNames } = req.local;
        try {
            if (!roleNames.includes(ROLE_TYPE))
                return res.status(403).json(BaseErrorDto_1.AUTHOR_ERR);
            next();
        }
        catch (ex) {
            logger_1.default.error('Authorization middleware false: ', ex.message);
            res.status(400).json(BaseErrorDto_1.INVALID_TOKEN);
        }
    });
};
exports.authorAdmin = author('ADMIN');
//# sourceMappingURL=auth.js.map