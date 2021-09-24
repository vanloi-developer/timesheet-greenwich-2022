import { error } from './error';
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IRequest } from '../types/ILocalrequest';
import logger from '../config/logger';
import { BaseResDto } from '../dto/BaseResDto';
import dotenv from 'dotenv';
import { AUTH_ERR, BaseError, INVALID_TOKEN } from '../dto/BaseErrorDto';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const fakeData = {
   error: {
      code: 0,
      details: 'Invalid user name or password',
      message: 'Login failed!',
      validationErrors: null,
      result: null,
   },
   success: false,
   targetUrl: null,
   unAuthorizedRequest: false,
};

export const authen = async (req: IRequest, res: Response, next: NextFunction) => {
   const bearerToken = req.headers['authorization'];

   if (!bearerToken)
      return res.status(401).json({
         ...BaseResDto,
         error: {
            ...AUTH_ERR,
         },
         success: false,
      });
   const token = bearerToken.split(' ')[1];

   try {
      const decoded = await jwt.verify(token, JWT_KEY);
      console.log(decoded);
      req.locals = decoded;
      next();
   } catch (ex) {
      logger.error('Authentication middleware false: ', ex.message);
      res.status(400).json({
         ...BaseResDto,
         ...INVALID_TOKEN,
         success: false,
      });
   }
};
