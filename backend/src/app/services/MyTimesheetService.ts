import { MyTimesheetRepository } from "../../dataAccess/repositories";
import { GetTimesheetDto } from "../dto/responses";
import { BaseService } from "./base";

class MyTimesheetService extends BaseService<MyTimesheetRepository> {
  constructor() {
    super(new MyTimesheetRepository());
  }

  public getAllTimesheetOfUser = async (
    startDate: string,
    endDate: string
  ): Promise<GetTimesheetDto[]> => {
    const result: GetTimesheetDto[] = [];

    //business logic

    return result;
  };
}

Object.seal(MyTimesheetService);
export { MyTimesheetService };
