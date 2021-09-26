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
                  id: 3,
               },
               {
                  name: 'Supervisor',
                  displayName: 'Supervisor',
                  normalizedName: 'SUPERVISOR',
                  description: null,
                  id: 4,
               },
               {
                  name: 'dev',
                  displayName: 'dev',
                  normalizedName: 'DEV',
                  description: 'abc',
                  id: 6,
               },
               {
                  name: 'User',
                  displayName: 'user',
                  normalizedName: 'USER',
                  description: '123',
                  id: 11,
               },
               { name: 'HR', displayName: 'HR', normalizedName: 'HR', description: 'HR', id: 16 },
               {
                  name: 'ncc',
                  displayName: 'PM',
                  normalizedName: 'NCC',
                  description: 'hello',
                  id: 17,
               },
               {
                  name: 'Project management ',
                  displayName: 'Project management ',
                  normalizedName: 'PROJECTMANAGEMENT ',
                  description: null,
                  id: 21,
               },
               {
                  name: 'CEO',
                  displayName: 'CEO',
                  normalizedName: 'CEO',
                  description: null,
                  id: 24,
               },
            ],
         };
      } catch (error) {
         logger.error('getRoles RoleRepository error: ', error.message);
      }
   }
}

export = new RoleRepository();
