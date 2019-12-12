﻿import { Get } from './Utilities';

interface IAVL_Data
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
}

export class AVLData implements IAVL_Data
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
    
  public static async Get(): Promise<Array<AVLData>>
  {
    const data = await Get<Array<AVLData>>('API/AVL/Get');
    return data;
  }

}

export default AVLData;