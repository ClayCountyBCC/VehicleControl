import { Get, Post_Empty } from '../Utilities';

interface IGeotabData
{
  device_id: string;
  serial_number: string;
  unitcode: string;
  date_device_updated: Date;
  location_updated_on: Date;
  latitude: number;
  longitude: number;
  error_information: Array<string>;
  show_errors: boolean;
  show_unit_options: boolean;
  has_date_error: boolean;
  has_location_error: boolean;
  has_asset_tag_error: boolean;
  has_unit_error: boolean;
  device_history: Array<any>;
}

export class GeotabData implements IGeotabData
{
  public device_id: string = "";
  public serial_number: string = "";
  public unitcode: string = "";
  public date_device_updated: Date = new Date();
  public location_updated_on: Date = new Date();
  public latitude: number = 0;
  public longitude: number = 0;  
  public error_information: Array<string> = [];
  public show_unit_options: boolean = false;
  public show_errors: boolean = false;
  public has_date_error: boolean = false;
  public has_location_error: boolean = false;
  public has_asset_tag_error: boolean = false;
  public has_unit_error: boolean = false;
  public device_history: Array<any> = [];

  public static async Get(): Promise<Array<GeotabData>>
  {
    const data = await Get<Array<GeotabData>>('API/GT/Get');
    return data;
  }

  public static async Delete(device_id: string): Promise<Response>
  {
    const response = await Post_Empty("API/GT/Delete?device_id=" + device_id, {});
    return response;
  }

  public static async Update(device_id: string, unitcode: string): Promise<Response>
  {
    const response = await Post_Empty(`API/GT/Update?device_id=${device_id}&unitcode=${unitcode}`, {});
    return response;
  }

}

export default GeotabData;