import { TimesheetStatus, TimesheetType } from "../../../enums";
export interface GetTimesheetDto {
  id: number;
  projectName: string;
  taskName: string;
  projectTaskId: number;
  customerName: string;
  projectCode: string;
  dateAt: Date;
  workingTime: number;
  status: TimesheetStatus;
  note: string;
  typeOfWork: TimesheetType;
  isCharged: boolean;
  billable: boolean;
}
