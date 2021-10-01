"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseResDto_1 = require("../dto/resDto/BaseResDto");
const logger_1 = __importDefault(require("../config/logger"));
const BaseErrorDto_1 = require("../dto/resDto/BaseErrorDto");
const generateID_1 = __importDefault(require("../utils/generateID"));
const CustomerRepository_1 = __importDefault(require("../repositories/CustomerRepository"));
class CustomerService {
    constructor() {
        this._repository = CustomerRepository_1.default;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const customerInfo = req.body;
            // Customer name quang already existed
            try {
                //Check if customer existed
                const result = yield this._repository.findAll();
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('createCustomer CustomerService error: ', error.message);
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const customerInfo = req.body;
            // Customer name quang already existed
            try {
                // If exist then update
                if (customerInfo.id !== undefined) {
                    const exitstedCustomer = yield this._repository.findByName(customerInfo.name);
                    // Check if existed customer had the name
                    if (exitstedCustomer && exitstedCustomer.id !== customerInfo.id) {
                        return res
                            .status(500)
                            .json((0, BaseErrorDto_1.baseError)(`Customer name ${exitstedCustomer.name} already existed`));
                    }
                    const result = yield this._repository.update(customerInfo.id, customerInfo);
                    return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
                }
                //If exist check if duplicate customers's name
                const exitstedCustomer = yield this._repository.findByName(customerInfo.name);
                if (exitstedCustomer) {
                    return res
                        .status(500)
                        .json((0, BaseErrorDto_1.baseError)(`Customer name ${exitstedCustomer.name} already existed`));
                }
                // Fake id
                const id = (0, generateID_1.default)('customer');
                customerInfo.id = id;
                const result = yield this._repository.create(customerInfo);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('createCustomer CustomerService error: ', error.message);
                next(error);
            }
        });
        this.getAllPagging = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { filterItems, maxResultCount, skipCount, searchText } = req.body;
            try {
                const result = yield this._repository.filterUserPagging(filterItems, maxResultCount, skipCount, searchText);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('getAllPagging UserService error: ', error.message);
                next(error);
            }
        });
        this.Update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._repository.findById(req.body.id);
                if (!user)
                    return res.status(500);
                const result = yield this._repository.update(req.body.id, req.body);
                return res.status(200).json(Object.assign(Object.assign({}, BaseResDto_1.BaseResDto), { result }));
            }
            catch (error) {
                logger_1.default.error('createUser UserService error: ', error.message);
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.query.Id);
            try {
                const data = yield this._repository.findById(id);
                if (!data)
                    return res.status(500).json(BaseErrorDto_1.NOT_EXIST_CUSTOMERS);
                yield this._repository.deleteById(id);
                return res.status(200).json(Object.assign({}, BaseResDto_1.BaseResDto));
            }
            catch (error) {
                logger_1.default.error('createUser UserService error: ', error.message);
                next(error);
            }
        });
    }
}
module.exports = new CustomerService();
//# sourceMappingURL=CustomerService.js.map