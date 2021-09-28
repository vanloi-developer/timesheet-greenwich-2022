import { IRoleModel } from './../types/Models/IRoleModel';
import { searchTextFieldOpt } from './../utils/index';
import { REQUIRED_FIELD_CREATE_ROLE } from './../constants/index';
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
            items: await this._db.find({}).select('-_id'),
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
