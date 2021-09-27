import { BaseResDto } from './../dto/resDto/BaseResDto';
import { baseError } from './../dto/resDto/BaseErrorDto';
import { IRoleModel } from './../types/IRoleModel';
import { NextFunction, Request, Response } from 'express';
import { IRoleRepository } from '../types/IRoleRepository';
import RoleRepository from '../repositories/RoleRepository';
import logger from '../config/logger';
import generateID from '../utils/generateID';

class RoleService {
   private _repository: IRoleRepository = RoleRepository;

   public getRoles = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result = await this._repository.getRoles();

         return res.status(200).json({ ...BaseResDto, result });
      } catch (error) {
         logger.error('getRoles RoleService error: ', error.message);
         next(error);
      }
   };

   public create = async (req: Request, res: Response, next: NextFunction) => {
      const roleInput: IRoleModel = { ...req.body };

      try {
         //Check if email or username exist
         const exitstedTask = await this._repository.findByName(roleInput.name);
         if (exitstedTask)
            return res.status(500).json(baseError(`Role ${exitstedTask.name} already existed`));

         const id = generateID('role');
         roleInput.id = id;
         roleInput.normalizedName = roleInput.name.toUpperCase();

         const result = await this._repository.create(roleInput);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createRole RoleService error: ', error.message);
         next(error);
      }
   };
   public getAll = async (req: Request, res: Response, next: NextFunction) => {
      const Keyword: string = String(req.query.Keyword);
      const SkipCount = Number(req.query.SkipCount);
      const MaxResultCount = Number(req.query.MaxResultCount);

      try {
         const result = await this._repository.filterAll(Keyword, SkipCount, MaxResultCount);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAll RoleService error: ', error.message);
         next(error);
      }
   };
}

export = new RoleService();
