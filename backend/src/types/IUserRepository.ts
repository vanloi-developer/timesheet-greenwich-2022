import { IFilterItems } from './../dto/reqDto/AllPaggingDto';
import { IUserModel } from './Models/IUserModel';
export interface IUserRepository {
   findByUserNameEmail(userName: string, emailAddress: string);
   create(data: IUserModel);
   generateToken(userName: string);
   comparePassword(userName: string, plainPass: string);
   findById(id: number);
   findByUserName(userName: string);
   findUserNotPagging();
   filterUserPagging(
      filterItems: IFilterItems[],
      maxResultCount: number,
      skipCount: number,
      searchText: string,
   );
   getAllMangagers();
   deleteUserById(id: number);
   update(id: number, updateFeild);
   resetPassword(id: number, password: Object);
}
