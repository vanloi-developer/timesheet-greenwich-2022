import { searchTextFieldOpt } from './../utils/index';
import { REQUIRED_FIELD_SAVE_CUSTOMER } from './../constants/index';
import { IFilterItems, IFilterOpt } from './../dto/reqDto/AllPaggingDto';
import { ICustomerRepository } from '../types/Repositories/ICustomerRepository';
import db from '../models';
import { ICustomerModel } from '../types/Models/ICustomerModel';
import logger from '../config/logger';
class CustomerRepository implements ICustomerRepository {
   private readonly _db = db.Customer;

   async findAll() {
      try {
         return await this._db.find({}).select('-_id');
      } catch (error) {
         logger.error('findAll CustomerRepository error: ', error.message);
      }
   }

   async findByName(name: string) {
      try {
         return await this._db.findOne({ name }).select('-_id');
      } catch (error) {
         logger.error('findByName CustomerRepository error: ', error.message);
      }
   }

   async findById(id: number) {
      try {
         return await this._db.findOne({ id }).select('-_id');
      } catch (error) {
         logger.error('findByName CustomerRepository error: ', error.message);
      }
   }
   async create(customer: ICustomerModel) {
      try {
         return await this._db.create(customer);
      } catch (error) {
         logger.error('create CustomerRepository error: ', error.message);
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
         logger.error('update UserRepository error: ', error.message);
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

export = new CustomerRepository();
