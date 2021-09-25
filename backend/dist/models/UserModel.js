'use strict';
var __createBinding =
   (this && this.__createBinding) ||
   (Object.create
      ? function (o, m, k, k2) {
           if (k2 === undefined) k2 = k;
           Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                 return m[k];
              },
           });
        }
      : function (o, m, k, k2) {
           if (k2 === undefined) k2 = k;
           o[k2] = m[k];
        });
var __setModuleDefault =
   (this && this.__setModuleDefault) ||
   (Object.create
      ? function (o, v) {
           Object.defineProperty(o, 'default', { enumerable: true, value: v });
        }
      : function (o, v) {
           o['default'] = v;
        });
var __importStar =
   (this && this.__importStar) ||
   function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
         for (var k in mod)
            if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
               __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
   };
var __awaiter =
   (this && this.__awaiter) ||
   function (thisArg, _arguments, P, generator) {
      function adopt(value) {
         return value instanceof P
            ? value
            : new P(function (resolve) {
                 resolve(value);
              });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
         function fulfilled(value) {
            try {
               step(generator.next(value));
            } catch (e) {
               reject(e);
            }
         }
         function rejected(value) {
            try {
               step(generator['throw'](value));
            } catch (e) {
               reject(e);
            }
         }
         function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
         }
         step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
   };
var __importDefault =
   (this && this.__importDefault) ||
   function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
   };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const mongoose_1 = __importStar(require('mongoose'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const bcrypt_1 = __importDefault(require('bcrypt'));
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY;
const UserSchema = new mongoose_1.Schema({
   id: { type: Number, required: true },
   password: { type: string, required: true },
   roleNames: { type: Array },
   isActive: { type: Boolean },
   allowedLeaveDay: { type: Number },
   branch: { type: Number },
   userName: { type: string },
   emailAddress: { type: string },
   type: { type: Number },
   name: { type: string },
   surname: { type: string },
   sex: { type: Boolean },
   userCode: { type: string },
   isStopWork: { type: Boolean },
   managerId: { type: Number },
   level: { type: Number },
   salary: { type: Number },
   salaryAt: { type: string },
   address: { type: string },
   phoneNumber: { type: string },
   morningStartAt: { type: string },
   morningEndAt: { type: string },
   morningWorking: { type: Number },
   afternoonStartAt: { type: string },
   afternoonEndAt: { type: string },
   afternoonWorking: { type: Number },
   createdAt: { type: Date, default: new Date() },
});
UserSchema.methods.generateAuthToken = function () {
   return __awaiter(this, void 0, void 0, function* () {
      const token = yield jsonwebtoken_1.default.sign(
         {
            id: this.id,
            roleNames: this.roleNames,
         },
         JWT_KEY,
      );
      return token;
   });
};
UserSchema.methods.comparePassHash = function (plainPass) {
   return __awaiter(this, void 0, void 0, function* () {
      return yield bcrypt_1.default.compare(plainPass, this.password);
   });
};
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=UserModel.js.map
