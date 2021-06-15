import { IAccount } from '../interfaces';

export type SignInDTO = Pick<IAccount, 'username' | 'password'>;
