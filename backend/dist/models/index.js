"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("./UserModel"));
const CustomerModel_1 = __importDefault(require("./CustomerModel"));
const TaskModel_1 = __importDefault(require("./TaskModel"));
const RoleModel_1 = __importDefault(require("./RoleModel"));
const ProjectModel_1 = __importDefault(require("./ProjectModel"));
const Tasks_in_projectModel_1 = __importDefault(require("./Tasks_in_projectModel"));
const Users_in_projectModel_1 = __importDefault(require("./Users_in_projectModel"));
const MyTimesheetsModel_1 = __importDefault(require("./MyTimesheetsModel"));
exports.default = {
    User: UserModel_1.default,
    Customer: CustomerModel_1.default,
    Task: TaskModel_1.default,
    Role: RoleModel_1.default,
    Project: ProjectModel_1.default,
    Tasks_in_project: Tasks_in_projectModel_1.default,
    Users_in_project: Users_in_projectModel_1.default,
    MyTimesheets: MyTimesheetsModel_1.default,
};
//# sourceMappingURL=index.js.map