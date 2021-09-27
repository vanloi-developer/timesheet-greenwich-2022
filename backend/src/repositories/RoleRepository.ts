import { searchTextFieldOpt } from './../utils/index';
import { SEARCH_TEXT_FIELD_USER, REQUIRED_FIELD_CREATE_ROLE } from './../constants/index';
import { IRoleModel } from './../types/IRoleModel';
import { IRoleRepository } from './../types/IRoleRepository';
import db from '../models';
import logger from '../config/logger';

class RoleRepository implements IRoleRepository {
   private readonly _db = db.Role;

   async findByName(name: string) {
      try {
         return await (await this._db.findOne({ name })).isSelected('-_id');
      } catch (err) {
         logger.error('findByName RoleRepository error: ', err.message);
      }
   }

   async create(roleInput: IRoleModel) {
      try {
         return await this._db.create(roleInput);
      } catch (error) {
         logger.error('create RoleRepository error: ', error.message);
      }
   }

   async getRoles() {
      try {
         return {
            items: [
               {
                  name: 'Admin',
                  displayName: 'Admin',
                  normalizedName: 'ADMIN',
                  description: null,
                  id: 1,
               },
               {
                  name: 'BasicUser',
                  displayName: 'BasicUser',
                  normalizedName: 'BASICUSER',
                  description: null,
                  id: 2,
               },
            ],
         };
      } catch (error) {
         logger.error('getRoles RoleRepository error: ', error.message);
      }
   }

   async filterAll(Keyword: string, SkipCount: number, MaxResultCount: number) {
      //Search with name | username ... text
      let filterOpt: any = {};
      if (Keyword && Keyword !== '') {
         let orOpt = searchTextFieldOpt(Keyword, REQUIRED_FIELD_CREATE_ROLE);
         if (orOpt.length) filterOpt.$or = orOpt;
      }
      try {
         const items = await this._db
            .find(filterOpt)
            .skip(SkipCount)
            .limit(MaxResultCount)
            .select('-_id');
         return {
            totalCount: items.length,
            items,
         };
      } catch (error) {
         logger.error('findUserPagging UserRepository error: ', error.message);
      }
   }
}

export = new RoleRepository();
