import { TimesheetType } from "../../../enums";

export interface LockTimesheetDto {
  userId: number;

  id: number;

  type: TimesheetType;
}
