import { IMyTimesheetsModel } from '../types/Models/IMyTimesheetsModel';
// import { ITasksInMyTimesheetsRepository } from './../types/Repositories/ITasksInMyTimesheetsRepository';
// import { IUsers_in_myTimesheetsModel } from '../types/Models/IUsers_in_myTimesheetsModel';
// import { ITasks_in_myTimesheetsModel } from '../types/Models/ITasks_in_myTimesheetsModel';
// import { IMyTimesheetsRepository } from './../types/Repositories/IMyTimesheetsRepository';
import { BaseResDto } from '../dto/resDto/BaseResDto';
import { NextFunction, Response } from 'express';
import MyTimesheetsRepository from '../repositories/MyTimessheetsRepository';
import logger from '../config/logger';
import generateID from '../utils/generateID';
import { IMyTimesheetsRepository } from '../types/Repositories/IMyTimesheetsRepository';
import { IRequest } from '../types/IRequest';

class MyTimesheetsService {
   private _repository: IMyTimesheetsRepository = MyTimesheetsRepository;

   public getAllOfUser = async (req: IRequest, res: Response, next: NextFunction) => {
      const userId: number = req.local.id;
      const startDate: string = String(req.query.startDate);
      const endDate: string = String(req.query.endDate);

      try {
         const result = await this._repository.filterByUserId(userId, startDate, endDate);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAll MyTimesheetsService error: ', error.message);
         next(error);
      }
   };

   public create = async (req: IRequest, res: Response, next: NextFunction) => {
      const myTimesheetsInput: IMyTimesheetsModel = { ...req.body };

      try {
         //Auto generate id
         const id: number = generateID('mytimesheets');
         myTimesheetsInput.id = id;
         myTimesheetsInput.userId = req.local.id;

         let result: IMyTimesheetsModel = await this._repository.create(myTimesheetsInput);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createmyTimesheets myTimesheetsService error: ', error.message);
         next(error);
      }
   };

   public submit = async (req: IRequest, res: Response, next: NextFunction) => {
      const userId: number = req.local.id;
      const startDate: string = String(req.query.startDate);
      const endDate: string = String(req.query.endDate);

      try {
         const numberOfSubmit =
            (await this._repository.updateStatusByUserId(userId, startDate, endDate)) || 0;

         return res.status(200).json({
            ...BaseResDto,
            result: `Submit success ${numberOfSubmit} timesheets`,
         });
      } catch (error) {
         logger.error('submit MyTimesheetsService error: ', error.message);
         next(error);
      }
   };
}

export = new MyTimesheetsService();
