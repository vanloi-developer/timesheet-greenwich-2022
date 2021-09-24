import UserService = require('../services/UserService');
import { BaseRouter } from './BaseRouter';
import * as UserValidate from '../middlewares/validate/UserValidate';
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
class UserRouter extends BaseRouter {
   private _service = UserService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.post(
         '/Create',
         UserValidate.createUser,
         this._service.createUser.bind(this._service),
      );
   }
}

export = new UserRouter().router;
