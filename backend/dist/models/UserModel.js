"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importStar(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY;
const UserSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    password: { type: String, required: true },
    roleNames: { type: Array },
    isActive: { type: Boolean },
    allowedLeaveDay: { type: Number },
    branch: { type: Number },
    userName: { type: String },
    emailAddress: { type: String },
    type: { type: Number },
    name: { type: String },
    surname: { type: String },
    sex: { type: Boolean },
    userCode: { type: String },
    isStopWork: { type: Boolean },
    managerId: { type: Number },
    level: { type: Number },
    salary: { type: Number },
    salaryAt: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    morningStartAt: { type: String },
    morningEndAt: { type: String },
    morningWorking: { type: Number },
    afternoonStartAt: { type: String },
    afternoonEndAt: { type: String },
    afternoonWorking: { type: Number },
    createdAt: { type: Date, default: new Date() },
});
UserSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({
        id: parseInt(this.userCode),
        name: this.name,
        email: this.email,
        type: this.type,
    }, JWT_KEY);
    return token;
};
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=UserModel.js.map