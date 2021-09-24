import { NextFunction, Request, Response } from 'express';
import { BaseResDto } from '../dto/BaseResDto';
import bcrypt from 'bcrypt';
import { IUserRepository } from '../types/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import logger from '../config/logger';
import { BaseErrorDto } from '../dto/BaseErrorDto';
import genarateID from '../utils/genarateID';

const saltRounds = 10;

class UserService {
   private _repository: IUserRepository = UserRepository;

   public async createUser(req: Request, res: Response, next: NextFunction) {
      const userInput = { ...req.body };

      try {
         //Check if email or username exist
         const exitstedUser = await this._repository.findByUserNameEmail(
            userInput.userName,
            userInput.emailAddress,
         );

         if (exitstedUser) {
            let message = 'is already taken.';
            if (Object.keys(exitstedUser)[0] === 'userName')
               message = `User name '${exitstedUser.userName}' ` + message;
            else message = `Email address '${exitstedUser.emailAddress}' ` + message;

            return res.status(500).json({
               ...BaseResDto,
               error: {
                  ...BaseErrorDto,
                  message,
               },
            });
         }

         const salt = bcrypt.genSaltSync(saltRounds);
         const hashPass = await bcrypt.hashSync(userInput.password, salt);
         const id = genarateID();

         userInput.password = hashPass;
         userInput.id = id;

         const user = await this._repository.create(userInput);

         return res.status(200).json({
            ...BaseResDto,
            result: { ...user },
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
      }
   }
}

export = new UserService();

const validRequiredFeilds = (data) => {};
