import { IUsers_in_projectModel } from './../types/Models/IUsers_in_projectModel';
import { IProjectModel } from './../types/Models/IProjectModel';
import { searchTextFieldOpt } from './../utils/index';
// import { REQUIRED_FIELD_CREATE_Project } from './../constants/index';
import { IUsersInProjectRepository } from '../types/Repositories/IUsersInProjectRepository';
import db from '../models';
import logger from '../config/logger';

class UsersInProjectRepository implements IUsersInProjectRepository {
   private readonly _db = db.Users_in_project;

   async findByName(name: string) {
      try {
         return await await this._db.findOne({ name }).select('-_id');
      } catch (err) {
         logger.error('findByName UsersInProjectRepository error: ', err.message);
      }
   }

   async createMany(usersInput: IUsers_in_projectModel[]): Promise<IUsers_in_projectModel[]> {
      try {
         return await this._db.insertMany(usersInput);
      } catch (error) {
         logger.error('create UsersInProjectRepository error: ', error.message);
      }
   }

   // async getProjects() {
   //    try {
   //       return {
   //          items: await this._db.find({}).select('-_id'),
   //       };
   //    } catch (error) {
   //       logger.error('getProjects UsersInProjectRepository error: ', error.message);
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

export = new UsersInProjectRepository();
