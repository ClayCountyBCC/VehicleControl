import { Get, Post_Empty } from '../Utilities';

interface IUnitData
{
  unitcode: string;
  using_unit: string;
  group_label: string;
  show_in_minicad: boolean;

  avl_longitude: number;
  avl_latitude: number;
  avl_location_timestamp: Date;
  has_avl_device: boolean;
  has_avl_error: boolean;

  fc_longitude: number;
  fc_latitude: number;
  fc_location_timestamp: Date;
  has_fc_device: boolean;
  has_fc_error: boolean;

  cad_longitude: number;
  cad_latitude: number;
  cad_location_timestamp: Date;
  should_have_cad_location: boolean;
  has_cad_error: boolean;

  error_information: Array<string>;
  show_errors: boolean;
  show_unit_options: boolean;
  device_history: Array<any>;

}

export class UnitData implements IUnitData
{
  public unitcode: string = "";
  public using_unit: string = "";
  public group_label: string = "";
  public show_in_minicad: boolean = false;
  
  public avl_longitude: number = 0;
  public avl_latitude: number = 0;
  public avl_location_timestamp: Date = new Date();
  public has_avl_device: boolean = false;
  public has_avl_error: boolean = false;
  
  public fc_longitude: number = 0;
  public fc_latitude: number =0;
  public fc_location_timestamp: Date = new Date();
  public has_fc_device: boolean = false;
  public has_fc_error: boolean = false;
  
  public cad_longitude: number = 0;
  public cad_latitude: number = 0;
  public cad_location_timestamp: Date = new Date();
  public should_have_cad_location: boolean = false;
  public has_cad_error: boolean = false;
  
  public error_information: Array<string> = [];
  public show_errors: boolean = false;
  public show_unit_options: boolean = false;
  public device_history: Array<any> = [];

  public static async Get(): Promise<Array<UnitData>>
  {
    const data = await Get<Array<UnitData>>('API/Unit/Get');
    return data;
  }

  public static async Delete(unitcode: string): Promise<Response>
  {
    const response = await Post_Empty("API/Unit/Delete?unitcode=" + unitcode, {});
    return response;
  }

  public static async Update(unitcode: string, group: string, has_avl: boolean, has_fc: boolean, should_have_cad: boolean): Promise<Response>
  {
    const response = await Post_Empty(`API/Unit/Update?unitcode=${unitcode}&group=${group}&has_avl=${has_avl}&has_fc=${has_fc}&should_have_cad=${should_have_cad}`, {});
    return response;
  }

  public static async Add(unitcode: string, group: string, has_avl: boolean, has_fc: boolean, should_have_cad: boolean): Promise<Response>
  {
    const response = await Post_Empty(`API/Unit/Add?unitcode=${unitcode}&group=${group}&has_avl=${has_avl}&has_fc=${has_fc}&should_have_cad=${should_have_cad}`, {});
    return response;
  }

}

export default UnitData;