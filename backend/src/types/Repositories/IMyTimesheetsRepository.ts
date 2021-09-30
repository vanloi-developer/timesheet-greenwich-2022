// import { IMyTimesheetsReqDto } from '../../dto/reqDto/IMyTimesheetsReqDto';
import { IMyTimesheetsModel } from '../Models/IMyTimesheetsModel';
export interface IMyTimesheetsRepository {
   // findByName(name: string);
   // findById(id: number);
   create(myTimesheetsInput: IMyTimesheetsModel);
   filterByUserId(userId: number, startDate: string, endDate: string);
   updateStatus(userId: number, startDate: string, endDate: string);
   // filterAll(status: number | null, search: string);
   // update(id: number, updateFeild: Object);
   // deleteById(id: number);
   // updateWithUserAndTask(MyTimesheetsInput: IMyTimesheetsReqDto);
}
