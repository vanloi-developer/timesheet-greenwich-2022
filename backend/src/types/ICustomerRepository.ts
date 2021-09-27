import { IFilterItems } from './../dto/reqDto/AllPaggingDto';
import { ICustomerModel } from './ICustomerModel';
export interface ICustomerRepository {
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
