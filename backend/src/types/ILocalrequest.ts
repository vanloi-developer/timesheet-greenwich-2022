import { Request } from 'express';

export interface IUserDecodeToken {
   id: Number;
   roleNames: Array<String>;
}

export interface IRequest extends Request {
   locals: IUserDecodeToken;
}
