import { IUsers_in_projectModel } from './../Models/IUsers_in_projectModel';
import { IProjectModel } from '../Models/IProjectModel';
export interface IUsersInProjectRepository {
   // getProjects();
   findByName(name: string);
   createMany(usersInput: IUsers_in_projectModel[]);
   // filterAll(Keyword: string, SkipCount: number, MaxResultCount: number);
}
