"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const error = (err, req, res, next) => {
    logger_1.default.error(err.message);
    res.status(500).json({
        error: {
            code: 0,
            message: err.message,
            details: 'Error from the server',
        },
    });
};
exports.error = error;
//# sourceMappingURL=error.js.map