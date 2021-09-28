import { IMyTimesheet } from "../../interfaces";
import { MyTimesheetSchema } from "../schemas";
import { BaseRepository } from "./base";

class MyTimesheetRepository extends BaseRepository<IMyTimesheet> {
  constructor() {
    super("myTimesheets", MyTimesheetSchema);
  }
}

Object.seal(MyTimesheetRepository);
export { MyTimesheetRepository };
