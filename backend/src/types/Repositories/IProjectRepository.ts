import { IProjectReqDto } from '../../dto/reqDto/IProjectReqDto';
import { IProjectModel } from '../Models/IProjectModel';
export interface IProjectRepository {
   findByName(name: string);
   findById(id: number);
   create(ProjectInput: IProjectReqDto);
   filterAll(status: number | null, search: string);
}
