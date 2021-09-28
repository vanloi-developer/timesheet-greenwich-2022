import { GridParam } from "../../app/dto/requests/GridParam";
import { ApiError } from "../../app/core";
import { IProjectUsers, IUser } from "../../interfaces";
import { UserSchema } from "../schemas";
import { BaseRepository } from "./base";
import { ProjectUsersRepository } from ".";

class UserRepository extends BaseRepository<IUser> {
  private _projectUsersRepos = new ProjectUsersRepository();
  constructor() {
    super("users", UserSchema);
  }

  public findProjectManagers = async (id: number): Promise<string[]> => {
    
    let pms: string[] = [];

    let members: IProjectUsers[] =
      await this._projectUsersRepos.findByMembersByProjectId(id);

    members = members.filter((member) => {
      return member.type == 1;
    });

    for (let member of members) {
      let user: IUser = await this.findById(member.userId);
      pms.push(user.name);
    }

    return pms;
  };

  public getUserNotPagging = async () => {
    try {
      return await this._model.find(
        {},
        "id name isActive type jobTitle level userCode branch"
      );
    } catch (error) {
      throw new ApiError(400, `Error in layer dataAccess: ${error}`);
    }
  };

  public getAllManager = async () => {
    const listManagersById = await this._model
      .find({}, "id name type isActive jobTitle level userCode branch")
      .where("managerId")
      .ne(0);

    return listManagersById;
  };

  public getAllPagging = async (filter: GridParam) => {
    let filterSearch = {};

    for (let item of filter.filterItems) {
      filterSearch[item.propertyName] = item.value;
    }

    const totalCount = await this._model.countDocuments({});

    const keyword = new RegExp(filter.searchText, "i");

    let items = await this._model
      .find(
        {},
        "id userName name surname emailAddress phoneNumber address isActive fullName roleNames type salary salaryAt startDateAt managerId branch sex creationTime morningWorking allowedLeaveDay userCode jobTitle level registerWorkDay morningStartAt morningEndAt afternoonWorking afternoonEndAt"
      )
      .skip(filter.skipCount)
      .limit(filter.maxResultCount)
      .lean();

    items.projectUsers = [
      {
        projectId: 0,
        projectCode: "string",
        projectName: "string",
        projectUserType: 0,
        pms: ["string"],
      },
    ];

    items.managerName = "string";

    items.managerAvatarPath = "string";

    return {
      totalCount,
      items,
    };
  };
}

Object.seal(UserRepository);
export { UserRepository };
