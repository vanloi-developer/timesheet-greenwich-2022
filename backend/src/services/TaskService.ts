import { ITaskRepository } from './../types/Repositories/ITaskRepository';
import { TaskDto } from './../dto/resDto/TaskDto';
import { BaseResDto } from '../dto/resDto/BaseResDto';
import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { baseError, NOT_EXIST_CUSTOMERS, NOT_EXIST_TASK } from '../dto/resDto/BaseErrorDto';
import genarateID from '../utils/generateID';
import TaskRepository from '../repositories/TaskRepository';

class TaskService {
   private _repository: ITaskRepository = TaskRepository;

   public create = async (req: Request, res: Response, next: NextFunction) => {
      const taskInfo: TaskDto = req.body;
      // Task name quang already existed
      try {
         //Check if task existed
         const exitstedTask = await this._repository.findByName(taskInfo.name);
         if (exitstedTask)
            return res.status(500).json(baseError(`Task ${exitstedTask.name} already existed`));

         const id = genarateID('task');

         taskInfo.id = id;

         const result = await this._repository.create(taskInfo);

         return res.status(200).json({ ...BaseResDto, result });
      } catch (error) {
         logger.error('createTask TaskService error: ', error.message);
         next(error);
      }
   };
   public getAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result = await this._repository.findAll();
         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAll TaskService error: ', error.message);
         next(error);
      }
   };

   public UpdateBase = (updatefield?: Object) => {
      return async (req: Request, res: Response, next: NextFunction) => {
         try {
            const data = await this._repository.findById(req.body.id as number);
            if (!data) return res.status(500).json(NOT_EXIST_TASK);

            const result = await this._repository.update(
               req.body.id,
               updatefield ? updatefield : req.body,
            );

            return res.status(200).json({
               ...BaseResDto,
            });
         } catch (error) {
            logger.error('createUser UserService error: ', error.message);
            next(error);
         }
      };
   };

   public deArchive = this.UpdateBase({ isDeleted: false });

   public archive = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);
      try {
         const data = await this._repository.findById(id);
         if (!data) return res.status(500).json(NOT_EXIST_TASK);
         console.log(data);
         const result = await this._repository.update(id, { isDeleted: true });

         return res.status(200).json({
            ...BaseResDto,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };

   public delete = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);
      try {
         const data = await this._repository.findById(id);
         if (!data) return res.status(500).json(NOT_EXIST_TASK);

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

export = new TaskService();
