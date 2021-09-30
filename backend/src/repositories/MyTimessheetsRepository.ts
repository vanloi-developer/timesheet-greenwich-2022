import { IMyTimesheetsModel } from './../types/Models/IMyTimesheetsModel';
import { SEARCH_TEXT_FIELD_PROJECTS } from './../constants/index';
import { IUsers_in_projectModel } from './../types/Models/IUsers_in_projectModel';
import { ITasks_in_projectModel } from './../types/Models/ITasks_in_projectModel';
// import { IMyTimesheetsReqDto } from './../dto/reqDto/IMyTimesheetsReqDto';
import { searchTextFieldOpt } from './../utils/index';
import generateID from '../utils/generateID';
import { IMyTimesheetsRepository } from '../types/Repositories/IMyTimesheetsRepository';
import db from '../models';
import logger from '../config/logger';
import TasksInProjectRepository from './TasksInProjectRepository';
// import UsersInMyTimesheetsRepository from './UsersInMyTimesheetsRepository';
// import TasksInMyTimesheetsRepository from './TasksInMyTimesheetsRepository';
class MyTimesheetsRepository implements IMyTimesheetsRepository {
   private readonly _db = db.MyTimesheets;

   async filterByUserId(userId: number, startDate: string, endDate: string) {
      try {
         return await this._db.aggregate([
            {
               $match: {
                  userId,
                  dateAt: {
                     $gte: new Date(startDate),
                     $lt: new Date(endDate),
                  },
               },
            },
            {
               $lookup: {
                  from: 'tasks_in_projects',
                  let: { projectTaskId: '$projectTaskId' },
                  as: 'tasks_in_project',
                  pipeline: [
                     {
                        $match: {
                           $expr: {
                              $eq: ['$id', '$$projectTaskId'],
                           },
                        },
                     },
                     {
                        $lookup: {
                           from: 'tasks',
                           localField: 'taskId',
                           foreignField: 'id',
                           as: 'task',
                        },
                     },
                     { $unwind: '$task' },
                  ],
               },
            },
            {
               $lookup: {
                  from: 'tasks_in_projects',
                  let: { projectTaskId: '$projectTaskId' },
                  as: 'tasks_in_project',
                  pipeline: [
                     {
                        $match: {
                           $expr: {
                              $eq: ['$id', '$$projectTaskId'],
                           },
                        },
                     },
                     {
                        $lookup: {
                           from: 'tasks',
                           localField: 'taskId',
                           foreignField: 'id',
                           as: 'task',
                        },
                     },
                     {
                        $lookup: {
                           from: 'projects',
                           let: { projectId: '$projectId' },
                           as: 'project',
                           pipeline: [
                              {
                                 $match: {
                                    $expr: {
                                       $eq: ['$id', '$$projectId'],
                                    },
                                 },
                              },
                              {
                                 $lookup: {
                                    from: 'customers',
                                    localField: 'customerId',
                                    foreignField: 'id',
                                    as: 'customer',
                                 },
                              },
                              { $unwind: '$customer' },
                           ],
                        },
                     },
                     { $unwind: '$project' },
                     { $unwind: '$task' },
                  ],
               },
            },
            { $unwind: '$tasks_in_project' },
            {
               $project: {
                  id: '$id',
                  projectName: '$tasks_in_project.project.name',
                  taskName: '$tasks_in_project.task.name',
                  projectTaskId: '$projectTaskId',
                  customerName: '$tasks_in_project.project.customer.name',
                  projectCode: '$tasks_in_project.project.code',
                  dateAt: '$dateAt',
                  workingTime: '$workingTime',
                  status: '$status',
                  note: '$note',
                  typeOfWork: '$typeOfWork',
                  isCharged: '$isCharged',
                  billable: '$tasks_in_project.task.billable',
               },
            },
         ]);
      } catch (error) {
         logger.error('filterByUserId MyTimesheetsRepository error: ', error.message);
      }
   }

   async updateStatus(userId: number, startDate: string, endDate: string) {
      try {
         const timesheets = await this._db.find({
            userId,
            dateAt: {
               $gte: new Date(startDate),
               $lt: new Date(endDate),
            },
            status: 0,
         });

         if (!timesheets.length) return [];

         await this._db.updateMany(
            {
               userId,
               dateAt: {
                  $gte: new Date(startDate),
                  $lt: new Date(endDate),
               },
               status: 0,
            },
            { status: 1 },
         );

         return timesheets.length;
      } catch (error) {
         logger.error('findAndSumit MyTimesheetsRepository error: ', error.message);
      }
   }
   async create(myTimesheetsInput: IMyTimesheetsModel) {
      try {
         return await this._db.create(myTimesheetsInput);
      } catch (error) {
         logger.error('create MyTimesheetsRepository error: ', error.message);
      }
   }
}

export = new MyTimesheetsRepository();
