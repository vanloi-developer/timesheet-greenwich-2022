"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL;
exports.default = {
    connect: () => {
        mongoose_1.default.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
        });
        mongoose_1.default.connection.on("connected", () => {
            logger_1.default.succeed("Connect to MongoDB successfully !!!");
        });
        mongoose_1.default.connection.on("error", (err) => {
            logger_1.default.error(`Mongoose default connection has occured error: ${err}`);
        });
    },
};
//# sourceMappingURL=db.js.map