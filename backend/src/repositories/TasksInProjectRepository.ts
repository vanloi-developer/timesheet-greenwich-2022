import { ITasks_in_projectModel } from './../types/Models/ITasks_in_projectModel';
import { ITasksInProjectRepository } from '../types/Repositories/ITasksInProjectRepository';
import db from '../models';
import logger from '../config/logger';

class TasksInProjectRepository implements ITasksInProjectRepository {
   private readonly _db = db.Tasks_in_project;

   async findById(id: number) {
      try {
         return await this._db.findOne({ id }).select('-_id');
      } catch (err) {
         logger.error('findByName TasksInProjectRepository error: ', err.message);
      }
   }

   async findByName(name: string) {
      try {
         return await this._db.findOne({ name }).select('-_id');
      } catch (err) {
         logger.error('findByName TasksInProjectRepository error: ', err.message);
      }
   }

   async createMany(tasksInput: ITasks_in_projectModel[]): Promise<ITasks_in_projectModel[]> {
      try {
         return await this._db.insertMany(tasksInput);
      } catch (error) {
         logger.error('create TasksInProjectRepository error: ', error.message);
      }
   }

   async findTasksInProject(projectId: number) {
      try {
         return await this._db.find({ projectId }).select('-_id');
      } catch (err) {
         logger.error('findTaskInProject TasksInProjectRepository error: ', err.message);
      }
   }

   async deleteMany(projectId: number) {
      try {
         return await this._db.deleteMany({ projectId });
      } catch (err) {
         logger.error('findTaskInProject TasksInProjectRepository error: ', err.message);
      }
   }

   async updateMany(tasksInput, projectId) {
      try {
         return await this._db.updateMany({ projectId }, tasksInput, {
            upsert: true,
            setDefaultsOnInsert: true,
         });
      } catch (error) {
         logger.error('create TasksInProjectRepository error: ', error.message);
      }
   }
}

export = new TasksInProjectRepository();
