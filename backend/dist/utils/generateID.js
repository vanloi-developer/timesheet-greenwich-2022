"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generate = (model) => {
    const ID_STORE = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'ID.json'), 'utf-8'));
    if (!ID_STORE[model]) {
        ID_STORE[model] = {};
        ID_STORE[model].id = 0;
    }
    const ID = ID_STORE[model].id + 1;
    ID_STORE[model].id = ID;
    fs_1.default.writeFileSync(path_1.default.join(__dirname, 'ID.json'), JSON.stringify(ID_STORE));
    return ID;
};
module.exports = generate;
//# sourceMappingURL=generateID.js.map