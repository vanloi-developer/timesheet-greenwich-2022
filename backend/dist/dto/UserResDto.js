"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResDTO = void 0;
const index_1 = require("./../constants/index");
const VERSION = index_1.APP.VERSION;
const RELASE_DATE = index_1.APP.RELASE_DATE;
exports.UserResDTO = {
    application: {
        version: VERSION,
        releaseDate: RELASE_DATE,
        features: {},
    },
    user: null,
    tenant: null,
};
//# sourceMappingURL=UserResDto.js.map