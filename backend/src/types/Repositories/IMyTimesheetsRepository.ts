// import { IMyTimesheetsReqDto } from '../../dto/reqDto/IMyTimesheetsReqDto';
import { IMyTimesheetsModel } from '../Models/IMyTimesheetsModel';
export interface IMyTimesheetsRepository {
   create(myTimesheetsInput: IMyTimesheetsModel);
   filterByUserId(userId: number, startDate: string, endDate: string);
   filterAll(status: number, startDate: string, endDate: string);
   updateStatusByUserId(userId: number, startDate: string, endDate: string);
   updateManyStatus(myTimesheetIds: number[], status: number);
}
