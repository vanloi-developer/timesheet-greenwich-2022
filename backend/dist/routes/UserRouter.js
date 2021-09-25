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
const UserService = require("../services/UserService");
const BaseRouter_1 = require("./BaseRouter");
const UserValidate = __importStar(require("../middlewares/validate/UserValidate"));
// import { authen } from "../middlewares/authen";
// const fakeData = {
//    result: {
//       userlication: {
//          version: "4.3.0.0",
//          releaseDate: "2021-07-20T15:49:07.1350156+07:00",
//          features: {},
//       },
//       user: null,
//       tenant: null,
//    },
//    targetUrl: null,
//    success: true,
//    error: null,
//    unAuthorizedRequest: false,
//    __abp: true,
// };
const fakeData = {
    result: {
        userlication: {
            version: '4.3.0.0',
            releaseDate: '2021-09-09T14:18:42.133815+07:00',
            features: {},
        },
        user: {
            name: 'huy',
            surname: 'admin',
            userName: 'admindev',
            emailAddress: 'quanghuynb2@gmail.com',
            allowedLeaveDay: 0.0,
            type: null,
            level: null,
            sex: null,
            branch: 0,
            avatarPath: '/avatars/1630052510000_174_admindev.jpg',
            morningWorking: 3.5,
            morningStartAt: '08:30',
            morningEndAt: '12:00',
            afternoonWorking: 4.5,
            afternoonStartAt: '13:00',
            afternoonEndAt: 'S',
            isWorkingTimeDefault: true,
            id: 174,
        },
        tenant: null,
    },
    targetUrl: null,
    success: true,
    error: null,
    unAuthorizedRequest: false,
    __abp: true,
};
/**
 * @description AuthLoginRouter
 */
class UserRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this._service = UserService;
        this.init();
    }
    init() {
        this.router.post('/Create', UserValidate.createUser, this._service.createUser);
    }
}
module.exports = new UserRouter().router;
//# sourceMappingURL=UserRouter.js.map