import { IRoleModel } from './IRoleModel';
export interface IRoleRepository {
   getRoles();
   findByName(name: string);
   create(roleInput: IRoleModel);
   filterAll(Keyword: string, SkipCount: number, MaxResultCount: number);
}
