import { REQUIRED_FIELD_RESET_PASS, FAKE_MANAGERS } from './../constants/index';
import { validate } from './../middlewares/validate/FieldValidate';
import UserService from '../services/UserService';
import { BaseRouter } from './BaseRouter';
import { validCreate } from '../middlewares/validate/UserValidate';
import RoleService from '../services/RoleService';
import { validQueryID } from './../middlewares/validate/FieldValidate';
class UserRouter extends BaseRouter {
   private _userService = UserService;
   private _roleService = RoleService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get('/GetRoles', this._roleService.findAll);

      this.router.get('/GetUserNotPagging', this._userService.getUserNotPagging);
      this.router.get('/Get', validQueryID, this._userService.findById);
      this.router.get('/GetAllManager', (req, res) => {
         res.status(200).json(FAKE_MANAGERS);
      });

      this.router.post('/Create', validCreate, this._userService.create);
      this.router.post('/GetAllPagging', this._userService.getAllPagging);
      this.router.post('/DeactiveUser', this._userService.deactive);
      this.router.post('/ActiveUser', this._userService.active);
      this.router.post(
         '/ResetPassword',
         validate(REQUIRED_FIELD_RESET_PASS),
         this._userService.ResetPasword,
      );

      this.router.put('/Update', this._userService.update);

      this.router.delete('/Delete', validQueryID, this._userService.delete);
   }
}

export = new UserRouter().router;
