import { validQueryInput } from './../middlewares/validate/UserValidate';
import { validate } from '../middlewares/validate/FieldValidate';
import ProjectService from '../services/ProjectService';
import { BaseRouter } from './BaseRouter';

class ProjectRouter extends BaseRouter {
   private _service = ProjectService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.post('/Save', this._service.create);

      this.router.get('/getAll', this._service.getAll);
      this.router.get('/Get', validQueryInput, this._service.getById);
   }
}

export = new ProjectRouter().router;
