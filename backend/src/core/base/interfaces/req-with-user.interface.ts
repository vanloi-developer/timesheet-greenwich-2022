import { IAccount } from '../../account/interfaces';
import { Request } from 'express';

export interface RequestWithUser extends Request {
	user: IAccount;
}
