import { Get, Post_Empty } from '../Utilities';

interface ICADData
{
  unitcode: string;
  location_timestamp: Date;
  inci_id: string;
  status: string;
  avstatus: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number; 
  updated_on: Date;
  error_information: Array<string>;
  show_errors: boolean;
  show_unit_options: boolean;
  has_date_error: boolean;
  has_location_error: boolean;
  has_unit_error: boolean;
  device_history: Array<any>;
}

export class CADData implements ICADData
{
  public unitcode: string = "";
  public location_timestamp: Date = new Date();
  public inci_id: string = "";
  public status: string = "";
  public avstatus: string = "";
  public latitude: number = 0;
  public longitude: number = 0;
  public speed: number = 0;
  public heading: number = 0;
  public updated_on: Date = new Date();
  public error_information: Array<string> = [];
  public show_unit_options: boolean = false;
  public show_errors: boolean = false;
  public has_date_error: boolean = false;
  public has_location_error: boolean = false;
  public has_unit_error: boolean = false;
  public device_history: Array<any> = [];

  public static async Get(): Promise<Array<CADData>>
  {
    const data = await Get<Array<CADData>>('API/CAD/Get');
    return data;
  }

  public static async Delete(unitcode: string): Promise<Response>
  {
    const response = await Post_Empty("API/CAD/Delete?unitcode=" + unitcode, {});
    return response;
  }

}

export default CADData;