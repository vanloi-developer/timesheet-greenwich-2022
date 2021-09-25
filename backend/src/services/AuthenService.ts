import { AuthResultDto } from './../dto/AuthResultDto';
import { LOGIN_FAILED } from './../dto/BaseErrorDto';
import { BaseResDto } from './../dto/BaseResDto';
import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from '../types/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import logger from '../config/logger';

const l = {
   result: [
      {
         name: 'Tien Pham',
         isActive: false,
         type: 0,
         jobTitle: null,
         level: 15,
         userCode: null,
         avatarPath: '/avatars/1632474098451_1_tien.pham.jpg',
         branch: null,
         id: 1,
      },
   ],
   targetUrl: null,
   success: true,
   error: null,
   unAuthorizedRequest: false,
   __abp: true,
};
class AuthenService {
   private _repository: IUserRepository = UserRepository;

   public authen = async (req: Request, res: Response, next: NextFunction) => {
      const { userNameOrEmailAddress, password } = req.body;
      try {
         const exitstedUser = await this._repository.findByUserName(userNameOrEmailAddress);

         if (!exitstedUser) return res.status(500).json(LOGIN_FAILED);

         const checkPass = await this._repository.comparePassword(userNameOrEmailAddress, password);

         if (!checkPass) return res.status(500).json(LOGIN_FAILED);

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
