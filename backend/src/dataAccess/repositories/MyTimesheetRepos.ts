import { StartEndDateDto } from "../../app/dto/common/StartEndDateDto";

import { IMyTimesheet } from "../../interfaces";

import { MyTimesheetSchema } from "../schemas";

import { BaseRepository } from "./base";

import { MyTimesheetDto } from "../../app/dto/responses";

import { APPROVE_TIMESHEET, REJECT_TIMESHEET } from "../../app/constants";

class MyTimesheetRepository extends BaseRepository<IMyTimesheet> {
  constructor() {
    super("myTimesheets", MyTimesheetSchema);
  }

  public approveTimesheet = async (id: number) => {
    return await this._model
      .updateOne({ id }, { status: APPROVE_TIMESHEET })
      .lean(true);
  };

  public rejectTimesheet = async (id: number) => {
    return await this._model.updateOne({ id }, { status: REJECT_TIMESHEET });
  };

  public getAllTimesheetOfUserByStatus = async (
    userId: number,
    startDate: Date,
    endDate: Date,
    status: number
  ): Promise<MyTimesheetDto[]> => {
    return await this._model.find({
      userId,
      status,
      $and: [{ dateAt: { $gte: startDate } }, { dateAt: { $lte: endDate } }],
    });
  };

  public submitToPending = async (userId: number, date: StartEndDateDto) => {
    return await this._model.updateMany(
      {
        userId,
        status: 0,
        $and: [
          { dateAt: { $gte: date.startDate } },
          { dateAt: { $lte: date.endDate } },
        ],
      },
      { status: 1 }
    );
  };

  public getAllTimesheetOfUser = async (
    userId: number,
    startDate: Date,
    endDate: Date
  ) => {
    return await this._model.find({
      userId,
      $and: [{ dateAt: { $gte: startDate } }, { dateAt: { $lte: endDate } }],
    });
  };
}

Object.seal(MyTimesheetRepository);
export { MyTimesheetRepository };
