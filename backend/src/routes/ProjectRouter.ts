import { validQueryID, validQueryInput } from '../middlewares/validate/FieldValidate';
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
      this.router.post('/Save', this._service.createOrEdit);
      this.router.post('/Inactive', validate(['id']), this._service.inactive);
      this.router.post('/Active', validate(['id']), this._service.active);

      this.router.get('/getAll', this._service.getAll);
      this.router.get('/Get', validQueryInput, this._service.getById);

      this.router.delete('/Delete', validQueryID, this._service.deleteById);
   }
}

export = new ProjectRouter().router;
