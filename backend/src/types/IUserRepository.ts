import { IUserModel } from './IUserModel';
export interface IUserRepository {
   findByUserNameEmail(userName: string, emailAddress: string);
   create(data: IUserModel);
   generateToken(userName: string);
   comparePassword(userName: string, plainPass: string);
   findByID(id: number);
   findByUserName(userName: string);
   findUserNotPagging();
   findUserPagging();
   getAllMangagers();
   DeleteUserById(id: number);
   update(user: IUserModel);
   edit(id: number, editFeild);
}
