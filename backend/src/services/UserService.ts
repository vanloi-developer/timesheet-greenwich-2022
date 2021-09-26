import { ADMIN_PASSWORD } from './../constants/index';
import { IResetPassword } from './../dto/IResetPassword';
import { UserResDTO } from './../dto/UserResDto';
import { NextFunction, Request, Response } from 'express';
import { BaseResDto } from '../dto/BaseResDto';
import bcrypt from 'bcrypt';
import { IUserRepository } from '../types/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import logger from '../config/logger';
import { baseError, NOT_EXIST_USER, WRONG_ADMIN_PASS } from '../dto/BaseErrorDto';
import genarateID from '../utils/genarateID';
import { IUserDecodeToken } from '../types/IUserDecodeToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const saltRounds = 10;
class UserService {
   private _repository: IUserRepository = UserRepository;
   // error: {code: 0, message: "This User Id 227 is in a project ,You can't delete", details: null,…}
   // code: 0
   // details: null
   // message: "This User Id 227 is in a project ,You can't delete"
   // validationErrors: null
   // result: null
   // success: false
   // targetUrl: null
   // unAuthorizedRequest: false

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
            const ERR_RES = baseError();
            if (Object.keys(exitstedUser)[0] === 'userName')
               message = `User name '${exitstedUser.userName}' ` + message;
            else message = `Email address '${exitstedUser.emailAddress}' ` + message;

            ERR_RES.error.message = message;

            return res.status(500).json(ERR_RES);
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

   public Get = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);

      try {
         const result = await this._repository.findByID(id);

         if (!result) return res.status(500).json(NOT_EXIST_USER);

         return res.status(200).json({
            ...UserResDTO,
            result,
         });
      } catch (error) {
         logger.error('getUserLoginInfo UserService error: ', error.message);
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
         logger.error('getUserLoginInfo UserService error: ', error.message);
         next(error);
      }
   };

   public getUserNotPagging = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result = await this._repository.findUserNotPagging();
         // return res.status(200).json({
         //    ...UserResDTO,
         //    result,
         // });
         return res.status(200).json(result);
      } catch (error) {
         logger.error('getUserNotPagging UserService error: ', error.message);
         next(error);
      }
   };
   public getAllPagging = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result = await this._repository.findUserPagging();
         return res.status(200).json({
            ...UserResDTO,
            result,
         });
      } catch (error) {
         logger.error('getAllPagging UserService error: ', error.message);
         next(error);
      }
   };

   public findAllMangagers = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const result = await this._repository.getAllMangagers();
         return res.status(200).json({
            ...UserResDTO,
            result,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };

   public Delete = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);
      try {
         await this._repository.DeleteUserById(id);
         return res.status(200).json({
            ...UserResDTO,
            result: { message: 'Delete user successfully!' },
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };

   public Update = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = await this._repository.findByID(req.body.id as number);
         if (!user) return res.status(500);

         const result = await this._repository.update(req.body);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };

   public DeactiveUser = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.body.id as string);

      try {
         const user = await this._repository.findByID(id);
         if (!user) return res.status(500).json(NOT_EXIST_USER);

         await this._repository.edit(id, { isActive: false });

         return res.status(200).json({
            ...UserResDTO,
         });
      } catch (error) {
         logger.error('getUserLoginInfo UserService error: ', error.message);
         next(error);
      }
   };

   public ActiveUser = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.body.id as string);

      try {
         const user = await this._repository.findByID(id);
         if (!user) return res.status(500).json(NOT_EXIST_USER);
         await this._repository.edit(id, { isActive: true });

         return res.status(200).json({
            ...UserResDTO,
         });
      } catch (error) {
         logger.error('getUserLoginInfo UserService error: ', error.message);
         next(error);
      }
   };

   public ResetPasword = async (req: Request, res: Response, next: NextFunction) => {
      const { adminPassword, newPassword, userId } = req.body;

      try {
         if (adminPassword !== ADMIN_PASSWORD) return res.status(400).json(WRONG_ADMIN_PASS);

         const user = await this._repository.findByID(userId);
         if (!user) return res.status(500).json(NOT_EXIST_USER);

         await this._repository.edit(userId, { password: newPassword });

         return res.status(200).json({
            ...UserResDTO,
         });
      } catch (error) {
         logger.error('getUserLoginInfo UserService error: ', error.message);
         next(error);
      }
   };
}

export = new UserService();
