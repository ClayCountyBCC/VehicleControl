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
const Utilities_1 = __importDefault(require("./Utilities"));
class AVLData {
    constructor() {
        this.device_id = "";
        this.device_type = "";
        this.unitcode = "";
        this.direction = 0;
        this.location_timestamp = new Date();
        this.satellite_count = 0;
        this.velocity = 0;
        this.ip_address = "";
        this.latitude = 0;
        this.longitude = 0;
        this.updated_on = new Date();
        this.error_information = [];
    }
    Get() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Utilities_1.default.Get('API/AVL/Get');
            return data;
        });
    }
}
exports.AVLData = AVLData;
//# sourceMappingURL=avl_data.js.map