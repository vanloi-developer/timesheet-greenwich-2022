"use strict";
const index_1 = require("./../constants/index");
const BaseRouter_1 = require("./BaseRouter");
class TimekeepingRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.router.get('/GetMyDetails', (req, res) => {
            return res.status(200).json(index_1.FAKE_MYDETAILS);
        });
    }
}
module.exports = new TimekeepingRouter().router;
//# sourceMappingURL=TimekeepingRouter.js.map