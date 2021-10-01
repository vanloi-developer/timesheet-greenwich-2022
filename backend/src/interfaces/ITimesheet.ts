import {
  Branch,
  Level,
  TimesheetStatus,
  TimesheetType,
  TypeUser,
} from "../app/enums";

export interface ITimesheet {
  id: number;

  projectId: number;

  userId: number;

  user: string;

  customerName: string;

  projectCode: string;

  projectName: string;

  taskId: number;

  taskName: string;

  status: TimesheetStatus;

  typeOfWork: TimesheetType;

  workingTime: number;

  dateAt: Date;

  mytimesheetNote: string;

  isCharged: boolean;

  isUserInProject: boolean;

  branchName: string;

  branch: Branch;

  type: TypeUser;

  avatarPath: string;

  level: Level;

  listPM: string[];
}
