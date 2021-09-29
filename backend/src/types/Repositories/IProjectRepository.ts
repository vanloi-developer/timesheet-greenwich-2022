import { IProjectReqDto } from '../../dto/reqDto/IProjectReqDto';
import { IProjectModel } from '../Models/IProjectModel';
export interface IProjectRepository {
   findByName(name: string);
   findById(id: number);
   createOrUpdate(ProjectInput: IProjectReqDto);
   filterAll(status: number | null, search: string);
   update(id: number, updateFeild: Object);
   deleteById(id: number);
   updateWithUserAndTask(ProjectInput: IProjectReqDto);
}
