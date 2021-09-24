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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const fakeInvalReq = {
    result: null,
    targetUrl: null,
    success: false,
    error: {
        code: 0,
        message: "Your request is not valid!",
        details: "The following errors were detected during validation.\r\n - \r\n",
        validationErrors: [
            {
                message: "",
                members: ["rememberClient"],
            },
        ],
    },
    unAuthorizedRequest: false,
    __abp: true,
};
const invalData = {
    error: {
        code: 0,
        details: "Invalid user name or password",
        message: "Login failed!",
        validationErrors: null,
        result: null,
    },
    success: false,
    targetUrl: null,
    unAuthorizedRequest: false,
};
const authen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validData = validate(req.body);
    if (!validData)
        return res.status(400).json(fakeInvalReq);
    const user = yield models_1.default.User.findOne({
        userName: validData.userNameOrEmailAddress,
    });
    if (!user)
        return res.status(403).json(invalData);
    return res.status(200).json({
        result: {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE3NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbmRldiIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiUktEUUFXV1ZBWldSWEE1RlI0WE0zRjVUSE9PSEozTzIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4iLCJQcm9qZWN0QWRtaW4iLCJCYXNpY1VzZXIiLCJTdXBlcnZpc29yIiwiZGV2IiwiYWRtaW5kZXYiLCJVc2VyIl0sInN1YiI6IjE3NCIsImp0aSI6IjQ0M2M0NGI3LTFlMjYtNDA5NS1iNTI4LWRmNDZkMDk4MzA4ZCIsImlhdCI6MTYzMjM3ODcxNywibmJmIjoxNjMyMzc4NzE3LCJleHAiOjE2NDEwMTg3MTcsImlzcyI6IlRpbWVzaGVldCIsImF1ZCI6IlRpbWVzaGVldCJ9.esSCKJf8Fjl89IxO-5RZ7LEqsqOMJmayJrWHm3Wlyic",
            encryptedAccessToken: "wNYmO41/48SHNstaLVXxHCCre29BZQl1NhC6NM3R3rzpXtPQxVzH6jEzA/QhXFN5tu6Fk7pO53uppm1mVXMZgxbyRVz26dnepi/FyB6axBY+6gq1GL+uRQgoiFUCjRN2p8w6LevViwKlHyWZZJZO1DGVSjAi1m2U+og9pkHw9/SnBvLaYbDCtcOUzHzJJSvr9HxikoT2xJHkGeaWBV3MuKlgLyTMtSj7vYDwtYYqrN6mqO9zPhg1+rAXhzJh7bz4nFbjleiKfWwB+d93MbIRO0QBoSJ37/k7kV7Xlp8RFtX4qzXo4MxUe/srkX/vdT+G8lPTDwn3FpF1tJR+N44w+U32aTgFvCl4q4eg5UPuvYsR9tlnpy/8k5eorkqZPrjOVJ8PTIl13ZmhRktUAmo+J4S4nkYomqRITkMDISYOYVCok0lwMzoyfnsJK56tkmAyDnYSfrx0nDIomkTjmpbnJt/rI7uuPQhao/UEyJNiq3k8zQPf+lwJIMoxPvnn0bnWZJVhidZH5ghDVhqQdyVHcoEzRIWUChgDBbiFq6wVTlwD+oShvy0vOpiD6TnqfYK5btJWblcRxBXCT9rpxM0NF0Rlky/Hh5PfLRQur8MhjXYGAeqXXd67M3//g5yU7ARxqPjgNWY2BKosiEkgxCBHoA6omOMk3JOXMmC/KhYg0/t8fvVtp+g0244QykfcsY78L4dApHsUTb+FPsh/ZKTThZrAiqt9g6XKfSDWvm/ZsKEm9w9wCa59+hEl4dlHINECab5fFNzQxRdmfHoOWM3pNXZSEoL1e26mWdlAtkB4O6yHwm6vEvltw8DYSQU+AtZs82CRHnWGjuHbQpOcq44GtxFcI1RgGAsKf2YPNr/gHZJNM9AgjAZlzX02DcVgJ+iMHLXTekrdxmUUocBa1hudrv2VSpOS4aHI7NLcgxx3eVWem9v5sgx/rDwS0UsxX5rTCIyHYjnuI9ttKH+v4VyqKrotCQfW/782OVRxhyKhoVI=",
            expireInSeconds: 8640000,
            userId: 174,
        },
        targetUrl: null,
        success: true,
        error: null,
        unAuthorizedRequest: false,
        __abp: true,
    });
});
const validate = (data) => {
    if (!data.password || !data.userNameOrEmailAddress)
        return false;
    return data;
};
exports.default = authen;
//# sourceMappingURL=AuthenService.js.map