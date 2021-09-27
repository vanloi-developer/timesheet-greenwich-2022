import { validate } from './../middlewares/validate/FieldValidate';
import { REQUIRED_FIELD_CREATE_ROLE } from './../constants/index';
import RoleService from '../services/RoleService';
import { BaseRouter } from './BaseRouter';
// import { validCreate } from '../middlewares/validate/RoleValidate';
// import { validQueryID } from '../middlewares/validate/RoleValidate';

class RoleRouter extends BaseRouter {
   private _service = RoleService;
   constructor() {
      super();
      this.init();
   }

   protected init() {
      this.router.post('/Create', validate(REQUIRED_FIELD_CREATE_ROLE), this._service.create);
      this.router.get('/GetAll', this._service.getAll);
   }
   // async filterUserPagging(
   //    filterItems: IFilterItems[],
   //    maxResultCount: number,
   //    skipCount: number,
   //    searchText: string,
   // ) {
   //    // Option must have in search
   //    let filterOpt: IFilterOpt[] = filterItems.length
   //       ? filterItems.map((item) => ({
   //            [item.propertyName]: item.value,
   //         }))
   //       : [];

   //    //Search with name | username ... text
   //    if (searchText && searchText !== '') {
   //       let orOpt = searchTextFieldOpt(searchText, SEARCH_TEXT_FIELD_CUSTOMER);
   //       if (orOpt.length) filterOpt.push({ $or: orOpt });
   //    }
   //    try {
   //       const findOpt = filterOpt.length ? { $and: filterOpt } : {};

   //       const items = await this._db.find(findOpt).skip(skipCount).limit(maxResultCount);
   //       return {
   //          totalCount: items.length,
   //          items,
   //       };
   //    } catch (error) {
   //       logger.error('findUserPagging CutomerRepository error: ', error.message);
   //    }
   // }
}

export = new RoleRouter().router;
