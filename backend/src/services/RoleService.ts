import { NextFunction, Request, Response } from 'express';
import { IRoleRepository } from '../types/IRoleRepository';
import RoleRepository from '../repositories/RoleRepository';
import logger from '../config/logger';

import dotenv from 'dotenv';
import { UserResDTO } from '../dto/resDto/UserResDto';
dotenv.config();

class RoleService {
   private _repository: IRoleRepository = RoleRepository;

   public getRoles = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result = await this._repository.getRoles();

         return res.json({ ...UserResDTO, result });
      } catch (error) {
         logger.error('getRoles RoleService error: ', error.message);
         next(error);
      }
   };
}

export = new RoleService();
