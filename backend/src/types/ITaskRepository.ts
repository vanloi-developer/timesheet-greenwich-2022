import { IFilterItems } from './../dto/reqDto/AllPaggingDto';
import { ITaskModel } from './ITaskModel';
export interface ITaskRepository {
   findByName(name: string);
   findAll();
   findById(id: number);
   create(taskInfo: ITaskModel);
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
