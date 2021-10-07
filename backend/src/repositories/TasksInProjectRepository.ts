import { ITasks_in_projectModel } from './../types/Models/ITasks_in_projectModel';
import db from '../models';
import logger from '../config/logger';
import { BaseRepository } from './base/BaseRepository';

class TasksInProjectRepository extends BaseRepository<ITasks_in_projectModel> {
   constructor() {
      super(db.Tasks_in_project, 'TasksInProjectRepository');
   }

   async createMany(tasksInput: ITasks_in_projectModel[]): Promise<ITasks_in_projectModel[]> {
      return await this._db.insertMany(tasksInput);
   }

   async findTasksInProject(projectId: number) {
      return await this._db.find({ projectId }).select('-_id');
   }

   async deleteMany(projectId: number) {
      return await this._db.deleteMany({ projectId });
   }

   async updateMany(tasksInput, projectId) {
      return await this._db.updateMany({ projectId }, tasksInput, {
         upsert: true,
         setDefaultsOnInsert: true,
      });
   }
}

export = new TasksInProjectRepository();
