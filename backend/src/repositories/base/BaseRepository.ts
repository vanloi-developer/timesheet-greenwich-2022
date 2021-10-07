import { IDelete } from './../../types/Repositories/base/IDelete';
import { IWrite } from '../../types/Repositories/base/IWrite';
import { IRead } from '../../types/Repositories/base/IRead';
import { Model } from 'mongoose';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T>, IDelete<T> {
   public readonly _db;
   public readonly _repoName;

   constructor(db: Model<T>, repoName: string) {
      this._db = db;
      this._repoName = repoName;
   }

   async findAll(): Promise<T[]> {
      return await this._db.find({}).select('-_id');
   }

   async findOne(field: object): Promise<T> {
      return await this._db.findOne(field).select('-_id');
   }

   async update(id: number, updateFeild: Object): Promise<T> {
      return await this._db.findOneAndUpdate({ id }, updateFeild);
   }

   async create(model: T): Promise<T> {
      return await this._db.create(model);
   }

   async delete(id: number): Promise<void> {
      await this._db.deleteOne({ id });
   }
}
