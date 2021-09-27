import { INVALID_REQUEST } from './../../dto/resDto/BaseErrorDto';
import { REQUIRED_FIELD_RESET_PASS, REQUIRED_FIELD_SAVE_CUSTOMER } from './../../constants/index';
import { Request, Response, NextFunction } from 'express';
import { REQUIRED_FIELD_LOGIN } from '../../constants';

const validate = (requestFeild) => {
   return (req: Request, res: Response, next: NextFunction) => {
      const data = { ...req.body };
      const REQUIRED_FIELD = requestFeild;
      const INVALID_ERR = { ...INVALID_REQUEST };
      INVALID_ERR.error.validationErrors = [];

      const { emailAddress } = data;

      // Check missing required field
      const invalidField = checkField(REQUIRED_FIELD);

      if (invalidField) return res.status(400).json(INVALID_ERR);

      next();

      function checkField(arr: Array<string>) {
         arr.forEach((item) => {
            if (!data[item as string]) errorMess(item);
         });

         if (INVALID_ERR.error.validationErrors.length) return true;

         return false;
      }

      function errorMess(field: string, errmess: string = 'field is required') {
         let error = {
            message: `The ${upperFirstChar(field)} ${errmess}.`,
            members: [field],
         };
         // If invalidate. Create error messages and details
         INVALID_ERR.error.validationErrors.push(error);
         INVALID_ERR.error.details += `- ${error.message} .\r\n `;

         function upperFirstChar(text: string) {
            return text.charAt(0).toUpperCase() + text.slice(1);
         }
      }
   };
};

export const validLogin = validate(REQUIRED_FIELD_LOGIN);
export const validResetPass = validate(REQUIRED_FIELD_RESET_PASS);
export const validCreateCustomer = validate(REQUIRED_FIELD_SAVE_CUSTOMER);
