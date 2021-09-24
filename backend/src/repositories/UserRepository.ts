import { IUserRepository } from './../types/IUserRepository';
import db from '../models';
import { IUserModel } from '../types/IUserModel';
import logger from '../config/logger';

class UserRepository implements IUserRepository {
   private readonly _db = db.User;

   async findByUserNameEmail(userName: String, emailAddress: String) {
      try {
         let user: IUserModel = await this._db.findOne({ userName });
         if (user) return { userName: user.userName };

         let userByEmail = await this._db.findOne({ emailAddress });
         if (userByEmail) return { emailAddress: userByEmail.emailAddress };

         return null;
      } catch (error) {
         logger.error('findByUserNameEmail UserRepository error: ', error.message);
      }
   }

   async create(data) {
      try {
         return await this._db.create(data);
      } catch (error) {
         logger.error('findByUserNameEmail UserRepository error: ', error.message);
      }
   }
}

export = new UserRepository();
