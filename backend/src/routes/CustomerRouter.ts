import { validQueryID } from './../middlewares/validate/UserValidate';
import { validCreateCustomer } from './../middlewares/validate/FieldValidate';
import { BaseRouter } from './BaseRouter';
import CustomerService from '../services/CustomerService';

class CustomerRouter extends BaseRouter {
   private _service = CustomerService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.post('/Save', validCreateCustomer, this._service.create);
      this.router.post('/GetAllPagging', this._service.getAllPagging);

      this.router.delete('/Delete', validQueryID, this._service.Delete);
   }
}

export = new CustomerRouter().router;
