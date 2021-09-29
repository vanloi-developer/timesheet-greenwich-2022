// import { ITaskFilterOpt } from './../types/ICustomFilterOpt';
import { searchTextFieldOpt } from './../utils/index';
import { REQUIRED_FIELD_SAVE_CUSTOMER } from './../constants/index';
import { IFilterItems, IFilterOpt } from './../dto/reqDto/AllPaggingDto';
import { ITaskRepository } from '../types/Repositories/ITaskRepository';
import db from '../models';
import { ITaskModel } from '../types/Models/ITaskModel';
import logger from '../config/logger';
class TaskRepository implements ITaskRepository {
   private readonly _db = db.Task;

   async findByName(name: string) {
      try {
         return await this._db.findOne({ name }).select('-_id');
      } catch (error) {
         logger.error('findByName TaskRepository error: ', error.message);
      }
   }

   async findAll() {
      try {
         return await this._db.find({}).select('-_id');
      } catch (error) {
         logger.error('findByName TaskRepository error: ', error.message);
      }
   }

   async findById(id: number) {
      try {
         return await this._db.findOne({ id }).select('-_id');
      } catch (error) {
         logger.error('findByName TaskRepository error: ', error.message);
      }
   }
   async create(taskInfo: ITaskModel) {
      try {
         return await this._db.create(taskInfo);
      } catch (error) {
         logger.error('create TaskRepository error: ', error.message);
      }
   }

   async filterUserPagging(
      filterItems: IFilterItems[],
      maxResultCount: number,
      skipCount: number,
      searchText: string,
   ) {
      // Option must have in search
      let filterOpt: IFilterOpt[] = filterItems.length
         ? filterItems.map((item) => ({
              [item.propertyName]: item.value,
           }))
         : [];

      //Search with name | username ... text
      if (searchText && searchText !== '') {
         let orOpt = searchTextFieldOpt(searchText, REQUIRED_FIELD_SAVE_CUSTOMER);
         if (orOpt.length) filterOpt.push({ $or: orOpt });
      }
      try {
         const findOpt = filterOpt.length ? { $and: filterOpt } : {};

         const items = await this._db.find(findOpt).skip(skipCount).limit(maxResultCount);
         return {
            totalCount: items.length,
            items,
         };
      } catch (error) {
         logger.error('findUserPagging CutomerRepository error: ', error.message);
      }
   }

   async update(id: number, updateFeild: Object) {
      try {
         await this._db.findOneAndUpdate({ id }, updateFeild);
      } catch (error) {
         logger.error('findByID UserRepository error: ', error.message);
      }
   }

   async deleteById(id: number) {
      try {
         await this._db.deleteOne({ id });
      } catch (error) {
         logger.error('DeleteUserById UserRepository error: ', error.message);
      }
   }
}

export = new TaskRepository();
