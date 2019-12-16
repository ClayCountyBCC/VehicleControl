import { Get, Post_Empty } from './Utilities';

interface IAVLData
{
  device_id: string;
  device_type: string;
  unitcode: string;
  direction: number;
  location_timestamp: Date;
  satellite_count: number;
  velocity: number;
  latitude: number;
  longitude: number;
  updated_on: Date;
  error_information: Array<string>;
  show_errors: boolean;
  show_unit_options: boolean;
  has_date_error: boolean;
  has_location_error: boolean;
  has_unit_error: boolean;
  device_history: Array<any>;
}

export class AVLData implements IAVLData
{
  public device_id: string = "";
  public device_type: string = "";
  public unitcode: string = "";
  public direction: number = 0;
  public location_timestamp: Date = new Date();
  public satellite_count: number = 0;
  public velocity: number = 0;
  public latitude: number = 0;
  public longitude: number = 0;
  public updated_on: Date = new Date();
  public error_information: Array<string> = [];
  public show_unit_options: boolean = false;
  public show_errors: boolean = false;
  public has_date_error: boolean = false;
  public has_location_error: boolean = false;
  public has_unit_error: boolean = false;
  public device_history: Array<any> = [];
  
  public static async Get(): Promise<Array<AVLData>>
  {
    const data = await Get<Array<AVLData>>('API/AVL/Get');
    return data;
  }

  public static async Delete(device_id: string): Promise<Response>
  {
    const response = await Post_Empty("API/AVL/Delete?device_id=" + device_id, {});
    return response;
  }

  public static async Update(device_id: string, device_type: string, unitcode: string): Promise<Response>
  {
    const response = await Post_Empty(`API/AVL/Update?device_id=${device_id}&device_type=${device_type}&unitcode=${unitcode}`, {});
    return response;
  }

}

export default AVLData;