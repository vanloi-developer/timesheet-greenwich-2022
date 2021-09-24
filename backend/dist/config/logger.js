"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.default = {
    error: (text, e = '') => console.log(chalk_1.default.bold.red(text + e)),
    succeed: (text) => console.log(chalk_1.default.bold.green(text)),
    cyan: (text) => console.log(chalk_1.default.bold.cyan(text)),
};
//# sourceMappingURL=logger.js.map