import { Get } from './Utilities';

interface IUnitHistory
{
  id: number;
  unitcode: string;
  field: string;
  changed_from: string;
  changed_to: string;
  changed_on: Date;
  changed_by: string;
  error_message: string;
}

export class UnitHistory implements IUnitHistory
{
  public id: number = -1;
  public unitcode: string = "";
  public field: string = "";
  public changed_from: string = "";
  public changed_to: string = "";
  public changed_on: Date = new Date();
  public changed_by: string = "";
  public error_message: string = "";

  public static async GetByUnit(unitcode: string): Promise<Array<UnitHistory>>
  {
    const data = await Get<Array<UnitHistory>>('API/History/Unit?unit=' + unitcode);
    return data;
  }

  public static async GetByDeviceId(device_id: string): Promise<Array<UnitHistory>>
  {
    const data = await Get<Array<UnitHistory>>('API/History/DeviceId?deviceId=' + device_id);
    return data;
  }

}

export default UnitHistory;