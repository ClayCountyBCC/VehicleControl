"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AppContext = react_1.default.createContext({
    avl_data: [],
    fleetcomplete_data: [],
    cad_data: [],
    unit_data: []
});
exports.default = AppContext;
//# sourceMappingURL=context.js.map