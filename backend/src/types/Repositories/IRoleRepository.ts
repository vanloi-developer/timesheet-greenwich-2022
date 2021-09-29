import { IRoleModel } from './../Models/IRoleModel';

export interface IRoleRepository {
   findAll();
   findByName(name: string);
   findById(id: number);
   create(roleInput: IRoleModel);
   filterAll(Keyword: string, SkipCount: number, MaxResultCount: number);
   delete(id: number);
}
