import {
  CustomerRepository,
  MyTimesheetRepository,
  ProjectRepository,
  ProjectTaskRepository,
  ProjectUsersRepository,
  TaskRepository,
  UserRepository,
} from "../../dataAccess/repositories";
import { ApiError } from "../core";

import { CustomerDto } from "../dto/common/CustomerDto";

import { UserDTO } from "../dto/common/UserDto";

import { TaskDto } from "../dto/requests";

import {
  MyTimesheetDto,
  ProjectDto,
  ProjectTasksDto,
  ProjectUsersDto,
  TimesheetDto,
} from "../dto/responses";

import { HttpStatusCode } from "../enums";

import { BaseService } from "./base";

class TimesheetService extends BaseService<MyTimesheetRepository> {
  private _projectUserRepos = new ProjectUsersRepository();

  private _projectTaskRepos = new ProjectTaskRepository();

  private _projectRepos = new ProjectRepository();

  private _taskRepos = new TaskRepository();

  private _userRepos = new UserRepository();

  private _customerRepos = new CustomerRepository();

  constructor() {
    super(new MyTimesheetRepository());
  }

  public approve = async (ids: number[]) => {
    try {
      let i = 0;
      for (let id of ids) {
        if (await this._repos.approveTimesheet(id)) {
          i++;
        }
      }

      return {
        fail: " - Fail 0 timesheets.",
        failedCount: 0,
        lockDate: ` - Locked date: ${new Date().toLocaleDateString()}.`,
        success: ` - Success ${i} timesheets.`,
        successCount: i,
      };
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in timesheet service: ${error}`
      );
    }
  };

  public reject = async (ids: number[]) => {
    try {
      let i = 0;
      for (let id of ids) {
        if (await this._repos.rejectTimesheet(id)) {
          i++;
        }
      }

      return {
        lockDate: ` - Locked date: ${new Date().toLocaleDateString()}.`,
        success: ` - Success ${i} timesheets.`,
        successCount: i,
        fail: " - Fail 0 timesheets.",
        failedCount: 0,
      };
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in timesheet service: ${error}`
      );
    }
  };

  public getAll = async (start: string, end: string, status: number) => {
    try {
      const result: TimesheetDto[] = [];

      const startDate = new Date(start);
      const endDate = new Date(end);

      let myTimesheets: MyTimesheetDto[];

      myTimesheets = await this._repos.getAllTimeSheetByStatus(
        status,
        startDate,
        endDate
      );

      for (let myTimesheet of myTimesheets) {
        const projectTask: ProjectTasksDto =
          await this._projectTaskRepos.findById(myTimesheet.projectTaskId);

        const task: TaskDto = await this._taskRepos.findById(
          projectTask.taskId
        );

        const project: ProjectDto = await this._projectRepos.findById(
          projectTask.projectId
        );

        const listPM: string[] = await this._userRepos.findProjectManagers(
          project.id
        );

        const customer: CustomerDto =
          await this._customerRepos.findCustomerByCustomerId(
            project.customerId
          );

        let isUserInProject: boolean = true;

        const projectUsers: ProjectUsersDto[] =
          await this._projectUserRepos.findByMembersByProjectId(project.id);

        for (let projectUser of projectUsers) {
          const user: UserDTO = await this._userRepos.findById(
            projectUser.userId
          );

          if (myTimesheet.userId === user.id) {
            const item: TimesheetDto = await {
              id: myTimesheet.id,

              projectId: project.id,

              userId: user.id,

              user: user.name,
              customerName: customer.name,

              projectCode: project.code,

              projectName: project.name,

              taskId: task.id,

              taskName: task.name,

              status: myTimesheet.status,

              typeOfWork: myTimesheet.typeOfWork,

              workingTime: myTimesheet.workingTime,

              dateAt: myTimesheet.dateAt,

              mytimesheetNote: myTimesheet.note,

              isCharged: myTimesheet.isCharged,

              isUserInProject,

              branch: user.branch,

              branchName: user.branch + "",

              type: user.type,

              level: user.level,

              avatarPath: user.avatarPath,

              listPM,
            };

            result.push(item);
          }
        }
      }
      return result;
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in timesheet service: ${error}`
      );
    }
  };
}

Object.seal(TimesheetService);
export { TimesheetService };
