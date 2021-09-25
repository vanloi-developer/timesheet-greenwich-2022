import UserService = require('../services/UserService');
import { BaseRouter } from './BaseRouter';
import * as UserValidate from '../middlewares/validate/UserValidate';
import RoleService = require('../services/RoleService');

/**
 * @description AuthLoginRouter
 */
class UserRouter extends BaseRouter {
   private _userService = UserService;
   private _roleService = RoleService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.post('/Create', UserValidate.createUser, this._userService.createUser);

      this.router.get('/GetRoles', this._roleService.getRoles);
      this.router.get('/GetUserNotPagging', this._userService.getUserNotPagging);
   }
}

export = new UserRouter().router;
