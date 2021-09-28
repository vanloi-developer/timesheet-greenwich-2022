import { ITasksInProjectRepository } from './../types/Repositories/ITasksInProjectRepository';
import { IUsers_in_projectModel } from './../types/Models/IUsers_in_projectModel';
import { ITasks_in_projectModel } from './../types/Models/ITasks_in_projectModel';
import { IProjectReqDto } from './../dto/reqDto/IProjectReqDto';
import { IProjectModel } from './../types/Models/IProjectModel';
import { IProjectRepository } from './../types/Repositories/IProjectRepository';
import { BaseResDto } from './../dto/resDto/BaseResDto';
import { baseError } from './../dto/resDto/BaseErrorDto';
import { NextFunction, Request, Response } from 'express';
import ProjectRepository from '../repositories/ProjectRepository';
import logger from '../config/logger';
import generateID from '../utils/generateID';
import TasksInProjectRepository from '../repositories/TasksInProjectRepository';
import UsersInProjectRepository from '../repositories/UsersInProjectRepository';

class ProjectService {
   private _repository: IProjectRepository = ProjectRepository;

   // public getProjects = async (req: Request, res: Response, next: NextFunction) => {
   //    try {
   //       const result = await this._repository.getProjects();

   //       return res.status(200).json({ ...BaseResDto, result });
   //    } catch (error) {
   //       logger.error('getProjects ProjectService error: ', error.message);
   //       next(error);
   //    }
   // };

   // public create = async (req: Request, res: Response, next: NextFunction) => {
   //    const ProjectInput: IProjectModel = { ...req.body };

   //    try {
   //       //Check if email or username exist
   //       const exitstedTask = await this._repository.findByName(ProjectInput.name);
   //       if (exitstedTask)
   //          return res.status(500).json(baseError(`Project ${exitstedTask.name} already existed`));

   //       //Auto generate id and normalizedName
   //       const id = generateID('Project');
   //       ProjectInput.id = id;
   //       ProjectInput.normalizedName = ProjectInput.name.toUpperCase();

   //       const result = await this._repository.create(ProjectInput);

   //       return res.status(200).json({
   //          ...BaseResDto,
   //          result,
   //       });
   //    } catch (error) {
   //       logger.error('createProject ProjectService error: ', error.message);
   //       next(error);
   //    }
   // };
   public getById = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = Number(req.query.input);

      try {
         const result = await this._repository.findById(id);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAll ProjectService error: ', error.message);
         next(error);
      }
   };

   public getAll = async (req: Request, res: Response, next: NextFunction) => {
      const status: number | null = req.query.status ? Number(req.query.status) : null;
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

   public create = async (req: Request, res: Response, next: NextFunction) => {
      const projectInput: IProjectReqDto = { ...req.body };

      try {
         // Check if email or username exist
         const exitstedproject = await this._repository.findByName(projectInput.name);
         if (exitstedproject)
            return res
               .status(500)
               .json(baseError(`Project ${exitstedproject.name} already existed`));

         //Auto generate id and normalizedName
         const id = generateID('project');
         projectInput.id = id;

         let result = await this._repository.create(projectInput);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createproject projectService error: ', error.message);
         next(error);
      }
   };
}

export = new ProjectService();
