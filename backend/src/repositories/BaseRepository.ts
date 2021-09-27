import { ICustomerRepository } from './../types/ICustomerRepository';
import db from '../models';
import { ICustomerModel } from '../types/ICustomerModel';
import logger from '../config/logger';
class CustomerRepository implements ICustomerRepository {
   private readonly _db = db.Customer;

   async findByName(name: string) {
      try {
         return await this._db.findOne({ name });
      } catch (err) {
         logger.error('findByName CustomerRepository error: ', err.message);
      }
   }

   async create(customer: ICustomerModel) {
      try {
         return await this._db.create(customer);
      } catch (error) {
         logger.error('create CustomerRepository error: ', error.message);
      }
   }
}

export = new CustomerRepository();
