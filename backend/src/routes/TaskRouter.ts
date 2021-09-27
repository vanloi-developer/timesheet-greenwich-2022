import { validQueryID } from './../middlewares/validate/UserValidate';
import { validCreateTask } from './../middlewares/validate/FieldValidate';
import { BaseRouter } from './BaseRouter';
import TaskService from '../services/TaskService';

class TaskRouter extends BaseRouter {
   private _service = TaskService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.get('/GetAll', this._service.getAll);

      this.router.post('/Save', validCreateTask, this._service.create);
      this.router.post('/DeArchive', this._service.deArchive);
      this.router.delete('/Archive', validQueryID, this._service.archive);

      // this.router.post('/GetAllPagging', this._service.getAllPagging);

      this.router.delete('/Delete', validQueryID, this._service.Delete);
   }
}

export = new TaskRouter().router;
