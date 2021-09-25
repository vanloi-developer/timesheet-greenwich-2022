import { UserResDTO } from './../dto/UserResDto';
import { NextFunction, Request, Response } from 'express';
import { BaseResDto } from '../dto/BaseResDto';
import bcrypt from 'bcrypt';
import { IUserRepository } from '../types/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import logger from '../config/logger';
import { BaseError } from '../dto/BaseErrorDto';
import genarateID from '../utils/genarateID';
import { IUserDecodeToken } from '../types/IUserDecodeToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const saltRounds = 10;
class UserService {
   private _repository: IUserRepository = UserRepository;

   public createUser = async (req: Request, res: Response, next: NextFunction) => {
      const userInput = { ...req.body };
      try {
         //Check if email or username exist
         const exitstedUser = await this._repository.findByUserNameEmail(
            userInput.userName,
            userInput.emailAddress,
         );

         //Check if userName or email existed
         if (exitstedUser) {
            let message = 'is already taken.';

            if (Object.keys(exitstedUser)[0] === 'userName')
               message = `User name '${exitstedUser.userName}' ` + message;
            else message = `Email address '${exitstedUser.emailAddress}' ` + message;

            BaseError.error.message = message;

            return res.status(500).json({
               ...BaseError,
            });
         }

         const hashPass = await bcrypt.hashSync(userInput.password, saltRounds);
         const id = genarateID('user');

         userInput.password = hashPass;
         userInput.id = id;

         const result = await this._repository.create(userInput);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };

   public getUserLoginInfo = async (req: Request, res: Response, next: NextFunction) => {
      if (req.headers['authorization'] === undefined) {
         return res.status(200).json({ ...UserResDTO });
      }

      const token = req.headers['authorization'].split(' ')[1];
      try {
         const { id }: IUserDecodeToken = await jwt.verify(token, JWT_KEY);

         const user = await this._repository.findByID(id);

         return res.status(200).json({
            ...UserResDTO,
            result: {
               ...UserResDTO.result,
               user,
            },
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };

   public getUserNotPagging = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result = await this._repository.findUserNotPagging();
         return res.status(200).json({
            ...UserResDTO,
            result,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };
}

export = new UserService();
