import { ITasksInProjectRepository } from './../types/Repositories/ITasksInProjectRepository';
import { IUsers_in_projectModel } from './../types/Models/IUsers_in_projectModel';
import { ITasks_in_projectModel } from './../types/Models/ITasks_in_projectModel';
import { IProjectReqDto } from './../dto/reqDto/IProjectReqDto';
import { IProjectModel } from './../types/Models/IProjectModel';
import { IProjectRepository } from './../types/Repositories/IProjectRepository';
import { BaseResDto } from './../dto/resDto/BaseResDto';
import { baseError, NOT_EXIST_PROJECT } from './../dto/resDto/BaseErrorDto';
import { NextFunction, Request, Response } from 'express';
import ProjectRepository from '../repositories/ProjectRepository';
import logger from '../config/logger';
import generateID from '../utils/generateID';
import TasksInProjectRepository from '../repositories/TasksInProjectRepository';
import UsersInProjectRepository from '../repositories/UsersInProjectRepository';

class ProjectService {
   private _repository: IProjectRepository = ProjectRepository;

   public getById = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = Number(req.query.input);

      try {
         const result = await this._repository.findById(id);
         console.log(result);
         if (!result)
            return res.status(500).json({
               ...NOT_EXIST_PROJECT,
            });

         return res.status(200).json({
            ...BaseResDto,
            result: result[0],
         });
      } catch (error) {
         logger.error('getAll ProjectService error: ', error.message);
         next(error);
      }
   };

   public getAll = async (req: Request, res: Response, next: NextFunction) => {
      const status: number | null =
         req.query.status !== undefined ? Number(req.query.status) : null;
      const search: string = String(req.query.search);

      try {
         const result = await this._repository.filterAll(status, search);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAll ProjectService error: ', error.message);
         next(error);
      }
   };

   public createOrEdit = async (req: Request, res: Response, next: NextFunction) => {
      const projectInput: IProjectReqDto = { ...req.body };

      try {
         // Check if email or username exist
         if (projectInput.id) {
            let result = await this._repository.updateWithUserAndTask(projectInput);
            return res.status(200).json({
               ...BaseResDto,
               result,
            });
         }
         //Auto generate id
         const id = generateID('project');
         projectInput.id = id;

         let result = await this._repository.createOrUpdate(projectInput);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createproject projectService error: ', error.message);
         next(error);
      }
   };

   public UpdateBase = (updatefield?: Object) => {
      return async (req: Request, res: Response, next: NextFunction) => {
         try {
            const data = await this._repository.findById(req.body.id as number);
            if (!data) return res.status(500).json(NOT_EXIST_PROJECT);

            const result = await this._repository.update(
               req.body.id,
               updatefield ? updatefield : req.body,
            );

            return res.status(200).json({ ...BaseResDto });
         } catch (error) {
            logger.error('createUser UserService error: ', error.message);
            next(error);
         }
      };
   };

   public inactive = this.UpdateBase({ status: 1 });

   public active = this.UpdateBase({ status: 0 });

   public deleteById = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);
      try {
         const data = await this._repository.findById(id);
         if (!data) return res.status(500).json(NOT_EXIST_PROJECT);

         await this._repository.deleteById(id);

         return res.status(200).json({
            ...BaseResDto,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };
}

export = new ProjectService();
