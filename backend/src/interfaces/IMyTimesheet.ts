import { TimesheetStatus, TimesheetType } from "src/app/enums";

import { IBase } from "./IBase";

export interface IMyTimesheet extends IBase {
  projectTaskId: number;

  note: string;

  workingTime: number;

  targetUserWorkingTime: number;

  typeOfWork: TimesheetType;

  isCharged: boolean;

  dateAt: Date;

  status: TimesheetStatus;

  projectTargetUserId?: number;

  id: number;

  userId: number;
}
