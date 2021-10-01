import { StartEndDateDto } from "../../app/dto/common/StartEndDateDto";
import { ApiError } from "../../app/core";
import { HttpStatusCode } from "../../app/enums";
import { IMyTimesheet } from "../../interfaces";
import { MyTimesheetSchema } from "../schemas";
import { BaseRepository } from "./base";
import { MyTimesheetDto } from "../../app/dto/responses";

class MyTimesheetRepository extends BaseRepository<IMyTimesheet> {
  constructor() {
    super("myTimesheets", MyTimesheetSchema);
  }

  public approveTimesheet = async (id: number) => {
    try {
      return await this._model.updateOne({ id }, { status: 2 }).lean(true);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in repository: ${error}`
      );
    }
  };

  public rejectTimesheet = async (id: number) => {
    try {
      return await this._model.updateOne({ id }, { status: 3 });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in repository: ${error}`
      );
    }
  };

  public getAllTimesheetOfUserByStatus = async (
    userId: number,
    startDate: Date,
    endDate: Date,
    status: number
  ): Promise<MyTimesheetDto[]> => {
    try {
      return await this._model.find({
        userId,
        status,
        $and: [{ dateAt: { $gte: startDate } }, { dateAt: { $lte: endDate } }],
      });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in repository: ${error}`
      );
    }
  };

  public submitToPending = async (userId: number, date: StartEndDateDto) => {
    try {
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
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in repository: ${error}`
      );
    }
  };

  public getAllTimesheetOfUser = async (
    userId: number,
    startDate: Date,
    endDate: Date
  ) => {
    try {
      return await this._model.find({
        userId,
        $and: [{ dateAt: { $gte: startDate } }, { dateAt: { $lte: endDate } }],
      });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in repository: ${error}`
      );
    }
  };
}

Object.seal(MyTimesheetRepository);
export { MyTimesheetRepository };
