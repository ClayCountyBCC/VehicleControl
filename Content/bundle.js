"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const Test = () => {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "test!"));
};
react_dom_1.render(react_1.default.createElement(Test, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const App = () => {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Boogedy!"));
};
react_dom_1.render(react_1.default.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=App.js.map