import { Schema } from "mongoose";

import { IMyTimesheet } from "../../interfaces";

import { TimesheetStatus, TimesheetType } from "../../app/enums";

export const MyTimesheetSchema = new Schema<IMyTimesheet>({
  id: { type: Number, required: true },

  projectTaskId: { type: Number },

  note: { type: String },

  workingTime: { type: Number },

  targetUserWorkingTime: { type: Number, default: 0 },

  typeOfWork: { type: Number, enum: TimesheetType },

  isCharged: { type: Boolean, default: false },

  dateAt: { type: Date },

  status: { type: Number, enum: TimesheetStatus, default: 0 },

  projectTargetUserId: { type: Number },

  userId: { type: Number },
});
