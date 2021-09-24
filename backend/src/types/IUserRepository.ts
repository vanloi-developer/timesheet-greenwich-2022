import { IUserModel } from './IUserModel';
export interface IUserRepository {
   findByUserNameEmail(userName: String, emailAddress: String);
   create(data: IUserModel);
   generateToken(userName: String);
   comparePassword(userName: String, plainPass: String);
   findByID(id: Number);
   findByUserName(userName: String);
}
