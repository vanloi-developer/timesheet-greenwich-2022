import { Request, Response, NextFunction } from 'express';
import { BaseResDto } from '../../dto/BaseResDto';
import { BaseErrorDto } from '../../dto/BaseErrorDto';

const REQUIRED_FIELD = ['name', 'surname', 'userName', 'emailAddress'];

export const createUser = (req: Request, res: Response, next: NextFunction) => {
   const data = { ...req.body };

   let details = 'The following errors were detected during validation.\r\n ';
   let validationErrors = [];
   const message = 'Your request is not valid!';

   const { emailAddress } = data;

   // Check missing required field
   const invalidField = checkField(REQUIRED_FIELD);
   const invalidEmail = checkFormatEmail(emailAddress);

   if (invalidField)
      return res.status(400).json({
         ...BaseResDto,
         error: { ...invalidField },
      });

   if (invalidEmail)
      return res.status(400).json({
         ...BaseResDto,
         error: { ...invalidEmail },
      });

   next();

   function checkField(arr: Array<String>) {
      arr.forEach((item) => {
         if (!data[item as string]) errorMess(item);
      });

      if (validationErrors.length) return { ...BaseErrorDto, message, details, validationErrors };

      return false;
   }

   function checkFormatEmail(emailAddress) {
      if (!emailAddress.includes('@')) {
         errorMess('emailAddress', 'field is not a valid e-mail address');
         return { ...BaseErrorDto, message, details, validationErrors };
      }

      return false;
   }

   function errorMess(field: String, errmess: String = 'field is required') {
      let error = {
         message: `The ${upperFirstChar(field)} ${errmess}.`,
         members: [field],
      };
      // If invalidate. Create error messages and details
      validationErrors.push(error);
      details += `- ${error.message} .\r\n `;

      function upperFirstChar(text: String) {
         return text.charAt(0).toUpperCase() + text.slice(1);
      }
   }
};
