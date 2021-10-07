import { searchTextFieldOpt } from './../utils/index';
import { SEARCH_TEXT_FIELD_USER, FAKE_ALL_MANAGERS } from './../constants/index';
import { IFilterItems, IFilterOpt } from './../dto/reqDto/AllPaggingDto';
import db from '../models';
import { IUserModel } from '../types/Models/IUserModel';
import logger from '../config/logger';
import { BaseRepository } from './base/BaseRepository';
class UserRepository extends BaseRepository<IUserModel> {
   constructor() {
      super(db.User, 'UserRepository');
   }

   async findByUserNameEmail(userName: string, emailAddress: string) {
      let user: IUserModel = await this._db.findOne({ userName });
      if (user) return { userName: user.userName };

      let userByEmail = await this._db.findOne({ emailAddress });
      if (userByEmail) return { emailAddress: userByEmail.emailAddress };

      return null;
   }

   async findUserNotPagging() {
      return await this._db
         .find({})
         .select('name isActive type jobTitle level userCode avatarPath branch id -_id');
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

      const items = await this._db.find(findOpt).skip(skipCount).limit(maxResultCount);
      return {
         totalCount: items.length,
         items,
      };
   }

   async generateToken(userName) {
      const user = await this._db.findOne({ userName });

      return await user.generateAuthToken();
   }

   async comparePassword(userName, plainPass) {
      const user = await this._db.findOne({ userName });

      return await user.comparePassHash(plainPass);
   }

   async getAllMangagers() {
      return FAKE_ALL_MANAGERS;
   }

   async resetPassword(id: number, password: Object) {
      await this._db.findOneAndUpdate({ id }, password);
   }
}

export = new UserRepository();
