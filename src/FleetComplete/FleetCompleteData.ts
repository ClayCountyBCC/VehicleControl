import { Get, Post_Empty } from '../Utilities';

interface IFleetCompleteData
{
  device_id: string;
  asset_tag: string
  unitcode: string;
  vin: string;
  make: string;
  model: string;
  vehicle_year: string;
  direction: number;
  location_timestamp: Date;
  updated_on: Date;
  velocity: number;
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

export class FleetCompleteData implements IFleetCompleteData
{
  public device_id: string = "";
  public asset_tag: string = "";
  public unitcode: string = "";
  public vin: string = "";
  public make: string = "";
  public model: string = "";
  public vehicle_year: string = "";
  public direction: number = 0;
  public location_timestamp: Date = new Date();
  public updated_on: Date = new Date();
  public velocity: number = 0;
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

  public static async Get(): Promise<Array<FleetCompleteData>>
  {
    const data = await Get<Array<FleetCompleteData>>('API/FC/Get');
    return data;
  }

  public static async Delete(device_id: string): Promise<Response>
  {
    const response = await Post_Empty("API/FC/Delete?device_id=" + device_id, {});
    return response;
  }

  public static async Update(asset_tag: string, unitcode: string): Promise<Response>
  {
    const response = await Post_Empty(`API/FC/Update?asset_tag=${asset_tag}&unitcode=${unitcode}`, {});
    return response;
  }

}

export default FleetCompleteData;