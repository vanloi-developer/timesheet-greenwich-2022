import { IUserRepository } from './../types/IUserRepository';
import db from '../models';
import { IUserModel } from '../types/IUserModel';
import logger from '../config/logger';

class UserRepository implements IUserRepository {
   private readonly _db = db.User;

   async findByUserNameEmail(userName: string, emailAddress: string) {
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

   async findByUserName(userName: string) {
      try {
         return await this._db.findOne({ userName });
      } catch (error) {
         logger.error('findByID UserRepository error: ', error.message);
      }
   }

   async create(data) {
      try {
         return await this._db.create(data);
      } catch (error) {
         logger.error('findByUserNameEmail UserRepository error: ', error.message);
      }
   }

   async generateToken(userName) {
      try {
         const user = await this._db.findOne({ userName });

         return await user.generateAuthToken();
      } catch (error) {
         logger.error('generateToken UserRepository error: ', error.message);
      }
   }

   async comparePassword(userName, plainPass) {
      try {
         const user = await this._db.findOne({ userName });

         return await user.comparePassHash(plainPass);
      } catch (error) {
         logger.error('generateToken UserRepository error: ', error.message);
      }
   }

   async findByID(id: Number) {
      try {
         return await this._db.findOne({ id });
      } catch (error) {
         logger.error('findByID UserRepository error: ', error.message);
      }
   }

   async findUserNotPagging() {
      try {
         return await this._db
            .find({})
            .select('name isActive type jobTitle level userCode avatarPath branch id -_id');
      } catch (error) {
         logger.error('findUserNotPagging UserRepository error: ', error.message);
      }
   }
}

export = new UserRepository();
