import { ITasks_in_projectModel } from './../Models/ITasks_in_projectModel';
import { IProjectModel } from '../Models/IProjectModel';
export interface ITasksInProjectRepository {
   // getProjects();
   findByName(name: string);
   createMany(tasksInput: ITasks_in_projectModel[]);
   // filterAll(Keyword: string, SkipCount: number, MaxResultCount: number);
}
