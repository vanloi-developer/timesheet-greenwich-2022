import { Request, Response, NextFunction } from 'express';
import { BaseResDto } from '../../dto/BaseResDto';
import { INVALID_REQUEST } from '../../dto/BaseErrorDto';

const REQUIRED_FIELD = ['password', 'userNameOrEmailAddress'];

export const validLogin = (req: Request, res: Response, next: NextFunction) => {
   const data = { ...req.body };

   let details = INVALID_REQUEST.error.details;
   let validationErrors = [];

   const { emailAddress } = data;

   // Check missing required field
   const invalidField = checkField(REQUIRED_FIELD);

   if (invalidField)
      return res.status(400).json({
         ...BaseResDto,
         error: { ...invalidField },
      });

   next();

   function checkField(arr: Array<string>) {
      arr.forEach((item) => {
         if (!data[item as string]) errorMess(item);
      });

      if (validationErrors.length) return { ...INVALID_REQUEST, details, validationErrors };

      return false;
   }

   function errorMess(field: string, errmess: string = 'field is required') {
      let error = {
         message: `The ${upperFirstChar(field)} ${errmess}.`,
         members: [field],
      };
      // If invalidate. Create error messages and details
      validationErrors.push(error);
      details += `- ${error.message} .\r\n `;

      function upperFirstChar(text: string) {
         return text.charAt(0).toUpperCase() + text.slice(1);
      }
   }
};
