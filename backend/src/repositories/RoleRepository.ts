import { IRoleRepository } from './../types/IRoleRepository';
import db from '../models';
import logger from '../config/logger';

class RoleRepository implements IRoleRepository {
   private readonly _db = db.User;

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
}

export = new RoleRepository();
