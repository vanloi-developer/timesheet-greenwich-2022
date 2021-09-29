import { ICustomerRepository } from '../types/Repositories/ICustomerRepository';
import { CustomerDto } from './../dto/resDto/CustomerDto';
import { BaseResDto } from '../dto/resDto/BaseResDto';
import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { baseError, NOT_EXIST_CUSTOMERS } from '../dto/resDto/BaseErrorDto';
import genarateID from '../utils/generateID';
import CustomerRepository from '../repositories/CustomerRepository';

class CustomerService {
   private _repository: ICustomerRepository = CustomerRepository;

   public getAll = async (req: Request, res: Response, next: NextFunction) => {
      const customerInfo: CustomerDto = req.body;
      // Customer name quang already existed
      try {
         //Check if customer existed
         const result = await this._repository.findAll();

         return res.status(200).json({ ...BaseResDto, result });
      } catch (error) {
         logger.error('createCustomer CustomerService error: ', error.message);
         next(error);
      }
   };

   public create = async (req: Request, res: Response, next: NextFunction) => {
      const customerInfo: CustomerDto = req.body;
      // Customer name quang already existed
      try {
         // If exist then update
         if (customerInfo.id !== undefined) {
            const exitstedCustomer = await this._repository.findByName(customerInfo.name);

            // Check if existed customer had the name
            if (exitstedCustomer && exitstedCustomer.id !== customerInfo.id) {
               return res
                  .status(500)
                  .json(baseError(`Customer name ${exitstedCustomer.name} already existed`));
            }
            const result = await this._repository.update(customerInfo.id, customerInfo);
            return res.status(200).json({ ...BaseResDto, result });
         }

         //If exist check if duplicate customers's name
         const exitstedCustomer = await this._repository.findByName(customerInfo.name);
         if (exitstedCustomer) {
            return res
               .status(500)
               .json(baseError(`Customer name ${exitstedCustomer.name} already existed`));
         }

         // Fake id
         const id = genarateID('customer');
         customerInfo.id = id;

         const result = await this._repository.create(customerInfo);

         return res.status(200).json({ ...BaseResDto, result });
      } catch (error) {
         logger.error('createCustomer CustomerService error: ', error.message);
         next(error);
      }
   };

   public getAllPagging = async (req: Request, res: Response, next: NextFunction) => {
      const { filterItems, maxResultCount, skipCount, searchText } = req.body;

      try {
         const result = await this._repository.filterUserPagging(
            filterItems,
            maxResultCount,
            skipCount,
            searchText,
         );

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('getAllPagging UserService error: ', error.message);
         next(error);
      }
   };

   public Update = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = await this._repository.findById(req.body.id as number);
         if (!user) return res.status(500);

         const result = await this._repository.update(req.body.id, req.body);

         return res.status(200).json({
            ...BaseResDto,
            result,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };

   public delete = async (req: Request, res: Response, next: NextFunction) => {
      const id: number = parseInt(req.query.Id as string);
      try {
         const data = await this._repository.findById(id);
         if (!data) return res.status(500).json(NOT_EXIST_CUSTOMERS);

         await this._repository.deleteById(id);

         return res.status(200).json({
            ...BaseResDto,
         });
      } catch (error) {
         logger.error('createUser UserService error: ', error.message);
         next(error);
      }
   };
}

export = new CustomerService();
