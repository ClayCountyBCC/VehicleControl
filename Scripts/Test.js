"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class Test extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            count: 0
        };
    }
    render() {
        return react_1.default.createElement("div", null, "Hello World");
    }
}
//const domContainer = document.getElementById('base');
//ReactDOM.render(React.createElement(App), domContainer);
exports.default = Test;
//# sourceMappingURL=Test.js.map