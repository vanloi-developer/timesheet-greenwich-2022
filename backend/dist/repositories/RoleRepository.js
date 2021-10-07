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
const index_1 = require("./../utils/index");
const index_2 = require("./../constants/index");
const models_1 = __importDefault(require("../models"));
const BaseRepository_1 = require("./base/BaseRepository");
class RoleRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.default.Role, 'RoleRepository');
    }
    filterAll(Keyword, SkipCount, MaxResultCount) {
        return __awaiter(this, void 0, void 0, function* () {
            //Search with name | username ... text
            let filterOpt = {};
            if (Keyword && Keyword !== '') {
                let orOpt = (0, index_1.searchTextFieldOpt)(Keyword, index_2.REQUIRED_FIELD_CREATE_ROLE);
                if (orOpt.length)
                    filterOpt.$or = orOpt;
            }
            const items = yield this._db
                .find(filterOpt)
                .skip(SkipCount)
                .limit(MaxResultCount)
                .select('-_id');
            return {
                totalCount: items.length,
                items,
            };
        });
    }
}
module.exports = new RoleRepository();
//# sourceMappingURL=RoleRepository.js.map