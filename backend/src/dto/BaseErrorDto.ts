import { error } from './../middlewares/error';
import { IBaseError } from '../types/IBaseError';
import { BaseResDto } from './BaseResDto';

const BaseErrorDto = (message: string | null = null, details: string | null = null): IBaseError => {
   return {
      ...BaseResDto,
      error: {
         code: 0,
         message,
         details,
         validationErrors: null,
      },
      success: false,
   };
};

export const BaseError = BaseErrorDto();
export const INVALID_TOKEN = BaseErrorDto('Your request is not valid!', 'Invalid token');
export const EXISTED_USER = BaseErrorDto('is already taken.');
export const AUTH_ERR = BaseErrorDto('Current user did not login to the application!');
export const SERVER_ERROR = BaseErrorDto('An internal error occurred during your request!');
export const INVALID_REQUEST = BaseErrorDto(
   'Your request is not valid!',
   'The following errors were detected during validation.\r\n ',
);
export const LOGIN_FAILED = BaseErrorDto('Login failed!', 'Invalid user name or password');
