import { IFilterItems } from './../../dto/reqDto/AllPaggingDto';
import { ICustomerModel } from './../Models/ICustomerModel';
export interface ICustomerRepository {
   findAll();
   findByName(name: string);
   findById(id: number);
   create(customer: ICustomerModel);
   filterUserPagging(
      filterItems: IFilterItems[],
      maxResultCount: number,
      skipCount: number,
      searchText: string,
   );
   findById(id: number);
   deleteById(id: number);
   update(id: number, updateFeild);
}
