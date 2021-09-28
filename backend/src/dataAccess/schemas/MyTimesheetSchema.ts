import { Schema } from "mongoose";
import { TimesheetStatus, TimesheetType } from "../../app/enums";
import { IMyTimesheet } from "../../interfaces";

export const MyTimesheetSchema = new Schema<IMyTimesheet>({
  id: { type: Number, required: true },

  projectTaskId: { type: Number },

  note: { type: String },

  workingTime: { type: Number },

  targetUserWorkingTime: { type: Number },

  typeOfWork: { type: Number, enum: TimesheetType },

  isCharged: { type: Boolean },

  dateAt: { type: String },

  status: { type: Number, enum: TimesheetStatus },

  projectTargetUserId: { type: Number },
});
