import {
  CustomerRepository,
  MyTimesheetRepository,
  ProjectRepository,
  ProjectTaskRepository,
  TaskRepository,
} from "../../dataAccess/repositories";

import {
  GetTimesheetDto,
  MyTimesheetDto,
  ProjectDto,
  ProjectTasksDto,
} from "../dto/responses";

import { ApiError } from "../core";

import { BaseService } from "./base";

import { HttpStatusCode } from "../enums";

import { TaskDto } from "../dto/requests";

import { CustomerDto } from "../dto/common/CustomerDto";

import { StartEndDateDto } from "../dto/common/StartEndDateDto";

class MyTimesheetService extends BaseService<MyTimesheetRepository> {
  private _projectTaskRepos = new ProjectTaskRepository();

  private _projectRepos = new ProjectRepository();

  private _customerRepos = new CustomerRepository();

  private _taskRepos = new TaskRepository();

  constructor() {
    super(new MyTimesheetRepository());
  }

  public saveList = async (
    items: MyTimesheetDto[],
    userId: number
  ): Promise<MyTimesheetDto[]> => {
    try {
      const result: MyTimesheetDto[] = [];

      for (let item of items) {
        item.userId = userId;

        const saved = await this.create(item);
        result.push(saved);
      }

      return result;
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };

  public create = async (item: MyTimesheetDto): Promise<MyTimesheetDto> => {
    try {
      item.dateAt = new Date(item.dateAt);

      return await this._repos.save(item);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };

  public delete = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.delete(id);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };

  public get = async (id: number): Promise<MyTimesheetDto> => {
    try {
      return await this._repos.findById(id);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };

  public submitToPending = async (
    userId: number,
    date: StartEndDateDto
  ): Promise<boolean> => {
    try {
      const result = await this._repos.submitToPending(userId, date);
      return result;
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };

  public getAllTimesheetOfUser = async (
    userId: number,
    startDate: Date,
    endDate: Date
  ): Promise<GetTimesheetDto[]> => {
    try {
      const result: GetTimesheetDto[] = [];

      const myTimesheets: MyTimesheetDto[] =
        await this._repos.getAllTimesheetOfUser(userId, startDate, endDate);

      for (let myTimesheet of myTimesheets) {
        const projectTask: ProjectTasksDto =
          await this._projectTaskRepos.findById(myTimesheet.projectTaskId);

        const project: ProjectDto = await this._projectRepos.findById(
          projectTask.projectId
        );

        const task: TaskDto = await this._taskRepos.findById(
          projectTask.taskId
        );

        const customer: CustomerDto =
          await this._customerRepos.findCustomerByCustomerId(
            project.customerId
          );

        const item: GetTimesheetDto = {
          id: myTimesheet.id,
          projectName: project.name,
          taskName: task.name,
          projectTaskId: myTimesheet.projectTaskId,
          customerName: customer.name,
          projectCode: project.code,
          dateAt: myTimesheet.dateAt,
          workingTime: myTimesheet.workingTime,
          status: myTimesheet.status,
          note: myTimesheet.note,
          typeOfWork: myTimesheet.typeOfWork,
          isCharged: myTimesheet.isCharged,
          billable: projectTask.billable,
        };

        result.push(item);
      }

      return result;
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };
}

Object.seal(MyTimesheetService);
export { MyTimesheetService };
