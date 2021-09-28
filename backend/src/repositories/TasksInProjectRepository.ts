import { ITasks_in_projectModel } from './../types/Models/ITasks_in_projectModel';
import { IProjectModel } from './../types/Models/IProjectModel';
import { searchTextFieldOpt } from './../utils/index';
// import { REQUIRED_FIELD_CREATE_Project } from './../constants/index';
import { ITasksInProjectRepository } from '../types/Repositories/ITasksInProjectRepository';
import db from '../models';
import logger from '../config/logger';

class TasksInProjectRepository implements ITasksInProjectRepository {
   private readonly _db = db.Tasks_in_project;

   async findByName(name: string) {
      try {
         return await await this._db.findOne({ name }).select('-_id');
      } catch (err) {
         logger.error('findByName TasksInProjectRepository error: ', err.message);
      }
   }

   async createMany(tasksInput: ITasks_in_projectModel[]): Promise<ITasks_in_projectModel[]> {
      try {
         return await this._db.insertMany(tasksInput);
      } catch (error) {
         logger.error('create TasksInProjectRepository error: ', error.message);
      }
   }

   // async getProjects() {
   //    try {
   //       return {
   //          items: await this._db.find({}).select('-_id'),
   //       };
   //    } catch (error) {
   //       logger.error('getProjects TasksInProjectRepository error: ', error.message);
   //    }
   // }

   // async filterAll(Keyword: string, SkipCount: number, MaxResultCount: number) {
   //    //Search with name | username ... text
   //    let filterOpt: any = {};
   //    if (Keyword && Keyword !== '') {
   //       let orOpt = searchTextFieldOpt(Keyword, REQUIRED_FIELD_CREATE_Project);
   //       if (orOpt.length) filterOpt.$or = orOpt;
   //    }
   //    try {
   //       const items = await this._db
   //          .find(filterOpt)
   //          .skip(SkipCount)
   //          .limit(MaxResultCount)
   //          .select('-_id');
   //       return {
   //          totalCount: items.length,
   //          items,
   //       };
   //    } catch (error) {
   //       logger.error('findUserPagging UserRepository error: ', error.message);
   //    }
   // }
}

export = new TasksInProjectRepository();
