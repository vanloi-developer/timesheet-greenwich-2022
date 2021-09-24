import { AuthResultDto } from './../dto/AuthResultDto';
import { LOGIN_FAILED } from './../dto/BaseErrorDto';
import { BaseResDto } from './../dto/BaseResDto';
import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from '../types/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import logger from '../config/logger';

class AuthenService {
   private _repository: IUserRepository = UserRepository;

   public authen = async (req: Request, res: Response, next: NextFunction) => {
      const { userNameOrEmailAddress, password } = req.body;
      const LOGIN_FAILED_RES = {
         ...BaseResDto,
         error: {
            ...LOGIN_FAILED,
         },
         success: false,
      };
      try {
         const exitstedUser = await this._repository.findByUserName(userNameOrEmailAddress);

         if (!exitstedUser) return res.status(500).json(LOGIN_FAILED_RES);

         const checkPass = await this._repository.comparePassword(userNameOrEmailAddress, password);

         if (!checkPass) return res.status(500).json(LOGIN_FAILED_RES);

         const accessToken = await this._repository.generateToken(userNameOrEmailAddress);

         return res.status(200).json({
            ...BaseResDto,
            result: {
               ...AuthResultDto,
               accessToken,
               userId: exitstedUser.id,
            },
         });
      } catch (error) {
         logger.error('authen AuthenService error: ', error.message);
         next(error);
      }
   };
}

export = new AuthenService();
