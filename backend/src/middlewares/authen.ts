import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import dotenv from 'dotenv';
import { AUTH_ERR, INVALID_TOKEN } from '../dto/resDto/BaseErrorDto';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

export const authen = async (req: Request, res: Response, next: NextFunction) => {
   if (!req.headers['authorization']) return res.status(200).json({ ...AUTH_ERR });

   const token = req.headers['authorization'].split(' ')[1];

   try {
      const decoded = await jwt.verify(token, JWT_KEY);
      next();
   } catch (ex) {
      logger.error('Authentication middleware false: ', ex.message);
      res.status(400).json(INVALID_TOKEN);
   }
};
