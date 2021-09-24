import { IUserModel } from './IUserModel';
export interface IUserRepository {
   findByUserNameEmail(userName: String, emailAddress: String);
   create(data: IUserModel);
}
