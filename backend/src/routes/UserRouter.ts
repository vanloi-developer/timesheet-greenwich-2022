import { REQUIRED_FIELD_RESET_PASS } from './../constants/index';
import { validate } from './../middlewares/validate/FieldValidate';
import UserService from '../services/UserService';
import { BaseRouter } from './BaseRouter';
import { validCreate } from '../middlewares/validate/UserValidate';
import RoleService from '../services/RoleService';
import { validQueryID } from '../middlewares/validate/UserValidate';
class UserRouter extends BaseRouter {
   private _userService = UserService;
   private _roleService = RoleService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get('/GetRoles', this._roleService.getRoles);
      this.router.get('/GetUserNotPagging', this._userService.getUserNotPagging);
      this.router.get('/GetAllManager', (req, res) => {
         res.status(200).json({
            result: [
               {
                  name: 'Tien Pham',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 15,
                  userCode: null,
                  avatarPath: '/avatars/1632474098451_1_tien.pham.jpg',
                  branch: null,
                  id: 1,
               },
               {
                  name: 'Tien Nguyen Huu',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 15,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 5,
               },
               {
                  name: 'Thai Bui Minh',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 14,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 10,
               },
               {
                  name: 'duong nghi viec giua thang 5',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 9,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 21,
               },
               {
                  name: 'duong nghi viec giua thang 5',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 9,
                  userCode: 'acsdc',
                  avatarPath: '',
                  branch: null,
                  id: 22,
               },
               {
                  name: 'NCCOP Sir',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 10,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 23,
               },
               {
                  name: 'Bui Lam',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 5,
                  userCode: '',
                  avatarPath: '',
                  branch: null,
                  id: 24,
               },
               {
                  name: 'Uno VATest',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 9,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 48,
               },
               {
                  name: 'duong duong',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 0,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 84,
               },
               {
                  name: 'thao1212 thaoo',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 0,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 93,
               },
               {
                  name: 'thy phan',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 6,
                  userCode: 'thy11',
                  avatarPath: '',
                  branch: null,
                  id: 118,
               },
               {
                  name: 'Dai Trinh',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: null,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 181,
               },
               {
                  name: 'hien pm1',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 7,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 219,
               },
            ],
            targetUrl: null,
            success: true,
            error: null,
            unAuthorizedRequest: false,
            __abp: true,
         });
      });
      this.router.get('/Get', validQueryID, this._userService.get);

      this.router.post('/Create', validCreate, this._userService.create);
      this.router.post('/GetAllPagging', this._userService.getAllPagging);
      this.router.post(
         '/ResetPassword',
         validate(REQUIRED_FIELD_RESET_PASS),
         this._userService.ResetPasword,
      );

      this.router.post('/DeactiveUser', this._userService.DeactiveUser);
      this.router.post('/ActiveUser', this._userService.ActiveUser);

      this.router.put('/Update', this._userService.Update);

      this.router.delete('/Delete', validQueryID, this._userService.Delete);
   }
}

export = new UserRouter().router;
