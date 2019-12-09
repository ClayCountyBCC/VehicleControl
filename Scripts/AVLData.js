var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Utilities from './Utilities.js';
export class AVLData {
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
    static Get() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Utilities.Get('API/AVL/Get');
            return data;
        });
    }
}
export default AVLData;
//# sourceMappingURL=AVLData.js.map