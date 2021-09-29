import { StartEndDateDto } from "../../app/dto/common/StartEndDateDto";
import { ApiError } from "../../app/core";
import { HttpStatusCode } from "../../app/enums";
import { IMyTimesheet } from "../../interfaces";
import { MyTimesheetSchema } from "../schemas";
import { BaseRepository } from "./base";

class MyTimesheetRepository extends BaseRepository<IMyTimesheet> {
  constructor() {
    super("myTimesheets", MyTimesheetSchema);
  }

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
