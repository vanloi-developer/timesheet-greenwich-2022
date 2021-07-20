"use strict";
class TestController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`,
        };
    }
}
module.exports = new TestController();
//# sourceMappingURL=test-controller.js.map