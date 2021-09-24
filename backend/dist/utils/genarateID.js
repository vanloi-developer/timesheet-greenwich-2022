"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generate = () => {
    const IDs = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'ID.json'), 'utf-8'));
    const arrIds = Object.keys(IDs);
    const lastIndex = parseInt(arrIds[arrIds.length - 1]);
    const nextInex = lastIndex + 1;
    IDs[nextInex.toString()] = true;
    fs_1.default.writeFileSync(path_1.default.join(__dirname, 'ID.json'), JSON.stringify(IDs));
    return nextInex;
};
module.exports = generate;
//# sourceMappingURL=genarateID.js.map