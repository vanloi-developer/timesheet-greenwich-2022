import { NextFunction, Request, Response } from 'express';
import UserRouter = require('./UserRouter');
import { BaseRouter } from './BaseRouter';
import * as UserValidate from '../middlewares/validate/UserValidate';
import UserService = require('../services/UserService');
import { authen } from '../middlewares/authen';
const fakeData = {
   result: {
      application: {
         version: '4.3.0.0',
         releaseDate: '2021-07-20T15:49:07.1350156+07:00',
         features: {},
      },
      user: null,
      tenant: null,
   },
   targetUrl: null,
   success: true,
   error: null,
   unAuthorizedRequest: false,
   __abp: true,
};

// const fakeData = {
//    result: {
//       application: {
//          version: '4.3.0.0',
//          releaseDate: '2021-09-09T14:18:42.133815+07:00',
//          features: {},
//       },
//       user: {
//          name: 'huy',
//          surname: 'admin',
//          userName: 'admindev',
//          emailAddress: 'quanghuynb2@gmail.com',
//          allowedLeaveDay: 0.0,
//          type: null,
//          level: null,
//          sex: null,
//          branch: 0,
//          avatarPath: '/avatars/1630052510000_174_admindev.jpg',
//          morningWorking: 3.5,
//          morningStartAt: '08:30',
//          morningEndAt: '12:00',
//          afternoonWorking: 4.5,
//          afternoonStartAt: '13:00',
//          afternoonEndAt: 'S',
//          isWorkingTimeDefault: true,
//          id: 174,
//       },
//       tenant: null,
//    },
//    targetUrl: null,
//    success: true,
//    error: null,
//    unAuthorizedRequest: false,
//    __abp: true,
// };

/**
 * @description AuthLoginRouter
 */
class AppRouter extends BaseRouter {
   constructor() {
      super();
      this.init();
   }

   /**
    * Connect routes to their matching controller endpoints.
    */
   protected init() {
      this.router.get('/Session/GetCurrentLoginInformations', authen, UserService.getUserInfo);

      this.router.use('/User', UserRouter);
   }
}

export = new AppRouter().router;
