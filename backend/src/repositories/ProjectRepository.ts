import { IUserModel } from './../types/Models/IUserModel';
import { ITaskModel } from './../types/Models/ITaskModel';
import { SEARCH_TEXT_FIELD_PROJECTS } from './../constants/index';
import { IUsers_in_projectModel } from './../types/Models/IUsers_in_projectModel';
import { ITasks_in_projectModel } from './../types/Models/ITasks_in_projectModel';
import { IProjectReqDto } from './../dto/reqDto/IProjectReqDto';
import { IProjectModel } from './../types/Models/IProjectModel';
import { searchTextFieldOpt } from './../utils/index';
import generateID from '../utils/generateID';
import { IProjectRepository } from '../types/Repositories/IProjectRepository';
import db from '../models';
import logger from '../config/logger';
import UsersInProjectRepository from './UsersInProjectRepository';
import TasksInProjectRepository from './TasksInProjectRepository';
class ProjectRepository implements IProjectRepository {
   private readonly _db = db.Project;

   async findById(id: number) {
      try {
         return await this._db.aggregate([
            { $match: { id } },
            {
               $lookup: {
                  from: 'tasks_in_projects',
                  let: { id: '$id' },
                  as: 'tasks',
                  pipeline: [
                     {
                        $match: {
                           $expr: {
                              $eq: ['$projectId', '$$id'],
                           },
                        },
                     },
                     {
                        $project: {
                           _id: 0,
                           taskId: '$taskId',
                           billable: '$billable',
                           id: '$id',
                        },
                     },
                  ],
               },
            },
            {
               $lookup: {
                  from: 'users_in_projects',
                  let: { id: '$id' },
                  as: 'users',
                  pipeline: [
                     {
                        $match: {
                           $expr: {
                              $eq: ['$projectId', '$$id'],
                           },
                        },
                     },
                     {
                        $project: {
                           _id: 0,
                           userId: '$userId',
                           type: '$type',
                           id: '$id',
                        },
                     },
                  ],
               },
            },
            {
               $project: {
                  _id: 0,
                  name: '$name',
                  code: '$code',
                  status: '$status',
                  timeStart: '$timeStart',
                  timeEnd: '$timeEnd',
                  note: '$note',
                  projectType: '$projectType',
                  customerId: '$customerId',
                  tasks: '$tasks',
                  users: '$users',
                  projectTargetUsers: '$projectTargetUsers',
                  isAllUserBelongTo: '$isAllUserBelongTo',
                  id: '$id',
               },
            },
         ]);
      } catch (err) {
         logger.error('findByName ProjectRepository error: ', err.message);
      }
   }

   async findByName(name: string) {
      try {
         return await await this._db.findOne({ name }).select('-_id');
      } catch (err) {
         logger.error('findByName ProjectRepository error: ', err.message);
      }
   }

   async createOrUpdate(projectInput: IProjectReqDto) {
      try {
         const { tasks, users } = projectInput;
         tasks.forEach((item) => {
            if (item.id === undefined) item.id = generateID('tasks_in_project');
            if (item.projectId === undefined) item.projectId = projectInput.id;
         });

         users.forEach((item) => {
            if (item.id === undefined) item.id = generateID('tasks_in_project');
            if (item.projectId === undefined) item.projectId = projectInput.id;
         });

         delete projectInput['tasks'];
         delete projectInput['users'];

         const project = await this._db.findOneAndUpdate({ id: projectInput.id }, projectInput, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
         });

         const createdTasks: ITasks_in_projectModel[] = await TasksInProjectRepository.createMany(
            tasks,
         );

         const createdUsers: IUsers_in_projectModel[] = await UsersInProjectRepository.createMany(
            users,
         );

         let result = {
            ...project,
            tasks: createdTasks,
            users: createdUsers,
         };

         return result;
      } catch (error) {
         logger.error('create ProjectRepository error: ', error.message);
      }
   }

   async filterAll(status: number | null, search: string) {
      // Search with name | username ... text
      const searchFilter = [];
      let match = [];

      if (status !== null) match.push({ status });
      if (search) match.push({ $or: searchTextFieldOpt(search, SEARCH_TEXT_FIELD_PROJECTS) });
      if (match.length) searchFilter.push({ $match: { $and: match } });

      const customerNameQuery = [
         {
            $lookup: {
               from: 'customers',
               localField: 'customerId',
               foreignField: 'id',
               as: 'customerName',
            },
         },
         { $unwind: '$customerName' },
      ];

      const activeMemberQuery = [
         {
            $lookup: {
               from: 'users_in_projects',
               let: { id: '$id' },
               as: 'activeMember',
               pipeline: [
                  {
                     $match: {
                        $expr: {
                           $and: [{ $eq: ['$projectId', '$$id'] }, { $ne: ['$type', 3] }],
                        },
                     },
                  },
               ],
            },
         },
      ];

      const projectManagersQuery = [
         {
            $lookup: {
               from: 'users_in_projects',
               let: { id: '$id' },
               as: 'pms',
               pipeline: [
                  {
                     $match: {
                        $expr: {
                           $and: [{ $eq: ['$projectId', '$$id'] }, { $ne: ['$type', 3] }],
                        },
                     },
                  },
                  {
                     $lookup: {
                        from: 'users',
                        let: { userId: '$userId', type: '$type' },
                        as: 'name',
                        pipeline: [
                           {
                              $match: {
                                 $expr: {
                                    $and: [{ $eq: ['$id', '$$userId'] }, { $eq: ['$$type', 1] }],
                                 },
                              },
                           },
                           {
                              $project: {
                                 name: { $concat: ['$name', ' ', '$surname'] },
                              },
                           },
                        ],
                     },
                  },
                  { $unwind: '$name' },
               ],
            },
         },
      ];

      const formatReturnFields = [
         {
            $project: {
               id: '$id',
               customerName: '$customerName.name',
               name: '$name',
               code: '$code',
               status: '$status',
               pms: '$pms.name.name',
               activeMember: { $size: '$activeMember' },
               projectType: '$projectType',
               timeStart: '$timeStart',
               timeEnd: '$timeEnd',
            },
         },
      ];

      const filterOpt = [
         ...customerNameQuery,
         ...activeMemberQuery,
         ...projectManagersQuery,
         ...formatReturnFields,
         ...searchFilter,
      ];
      try {
         return await this._db.aggregate(filterOpt);
      } catch (error) {
         logger.error('findUserPagging UserRepository error: ', error.message);
      }
   }

   async update(id: number, updateFeild: Object) {
      try {
         await this._db.findOneAndUpdate({ id }, updateFeild);
      } catch (error) {
         logger.error('update UserRepository error: ', error.message);
      }
   }

   async updateWithUserAndTask(projectInput: IProjectReqDto) {
      try {
         const projectId = projectInput.id;

         await UsersInProjectRepository.deleteMany(projectId);
         await TasksInProjectRepository.deleteMany(projectId);

         return await this.createOrUpdate(projectInput);
      } catch (error) {
         logger.error('create ProjectRepository error: ', error.message);
      }
   }

   async deleteById(id: number) {
      try {
         await UsersInProjectRepository.deleteMany(id);
         await TasksInProjectRepository.deleteMany(id);

         await this._db.deleteOne({ id });
      } catch (error) {
         logger.error('DeleteUserById UserRepository error: ', error.message);
      }
   }
}

export = new ProjectRepository();
