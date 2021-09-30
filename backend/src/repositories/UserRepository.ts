import { searchTextFieldOpt } from './../utils/index';
import { SEARCH_TEXT_FIELD_USER } from './../constants/index';
import { IFilterItems, IFilterOpt } from './../dto/reqDto/AllPaggingDto';
import { IUserRepository } from '../types/Repositories/IUserRepository';
import db from '../models';
import { IUserModel } from '../types/Models/IUserModel';
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

   async findById(id: Number) {
      try {
         return await await this._db.findOne({ id }).select('-_id');
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

   async filterUserPagging(
      filterItems: IFilterItems[],
      maxResultCount: number,
      skipCount: number,
      searchText: string,
   ) {
      // If have filterItems. Create Option must have array in search
      let filterOpt: IFilterOpt[] = filterItems.length
         ? filterItems.map((item) => ({
              [item.propertyName]: item.value,
           }))
         : [];

      //Search with name | username ... text
      if (searchText && searchText !== '') {
         let orOpt = searchTextFieldOpt(searchText, SEARCH_TEXT_FIELD_USER);
         if (orOpt.length) filterOpt.push({ $or: orOpt });
      }

      const findOpt = filterOpt.length ? { $and: filterOpt } : {};

      try {
         const items = await this._db.find(findOpt).skip(skipCount).limit(maxResultCount);
         return {
            totalCount: items.length,
            items,
         };
      } catch (error) {
         logger.error('findUserPagging UserRepository error: ', error.message);
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

   async getAllMangagers() {
      try {
         return {
            result: [
               {
                  name: 'Tien Pham',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 15,
                  userCode: null,
                  avatarPath: '/avatars/1632474098451_1_tien.pham.jpg',
                  branch: null,
                  id: 1,
               },
               {
                  name: 'Tien Nguyen Huu',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 15,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 5,
               },
               {
                  name: 'Thai Bui Minh',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 14,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 10,
               },
               {
                  name: 'duong nghi viec giua thang 5',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 9,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 21,
               },
               {
                  name: 'duong nghi viec giua thang 5',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 9,
                  userCode: 'acsdc',
                  avatarPath: '',
                  branch: null,
                  id: 22,
               },
               {
                  name: 'NCCOP Sir',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 10,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 23,
               },
               {
                  name: 'Bui Lam',
                  isActive: false,
                  type: 0,
                  jobTitle: null,
                  level: 5,
                  userCode: '',
                  avatarPath: '',
                  branch: null,
                  id: 24,
               },
               {
                  name: 'Uno VATest',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 9,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 48,
               },
               {
                  name: 'duong duong',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 0,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 84,
               },
               {
                  name: 'thao1212 thaoo',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 0,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 93,
               },
               {
                  name: 'thy phan',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 6,
                  userCode: 'thy11',
                  avatarPath: '',
                  branch: null,
                  id: 118,
               },
               {
                  name: 'Dai Trinh',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: null,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 181,
               },
               {
                  name: 'hien pm1',
                  isActive: true,
                  type: 0,
                  jobTitle: null,
                  level: 7,
                  userCode: null,
                  avatarPath: '',
                  branch: null,
                  id: 219,
               },
            ],
            targetUrl: null,
            success: true,
            error: null,
            unAuthorizedRequest: false,
            __abp: true,
         };
      } catch (error) {
         logger.error('getAllMangagers UserRepository error: ', error.message);
      }
   }

   async deleteUserById(id: number) {
      try {
         await this._db.deleteOne({ id });
      } catch (error) {
         logger.error('DeleteUserById UserRepository error: ', error.message);
      }
   }
   async update(id: number, updateFeild) {
      try {
         const a = await this._db.updateOne({ id }, updateFeild);
         return a;
      } catch (error) {
         logger.error('findByID UserRepository error: ', error.message);
      }
   }

   async resetPassword(id: number, password: Object) {
      try {
         await this._db.findOneAndUpdate({ id }, password);
      } catch (error) {
         logger.error('findByID UserRepository error: ', error.message);
      }
   }
}

export = new UserRepository();
