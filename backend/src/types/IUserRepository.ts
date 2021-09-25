import { IUserModel } from './IUserModel';
export interface IUserRepository {
   findByUserNameEmail(userName: string, emailAddress: string);
   create(data: IUserModel);
   generateToken(userName: string);
   comparePassword(userName: string, plainPass: string);
   findByID(id: Number);
   findByUserName(userName: string);
   findUserNotPagging();
}
