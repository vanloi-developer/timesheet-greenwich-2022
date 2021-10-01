import { TimesheetType } from "../../../enums";

export interface UnlockTimesheetDto {
  userId: number;

  id: number;

  type: TimesheetType;
}
