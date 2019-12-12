import AVLData from './AVLData';

export interface IState
{
  
  avl_data: Array<AVLData>
  fleetcomplete_data: Array<any>  
  cad_data: Array<any>
  unit_data: Array<any>
  filtered_avl_data: Array<AVLData>
  filtered_fleetcomplete_data: Array<any>
  filtered_cad_data: Array<any>
  filtered_unit_data: Array<any>
  avl_data_filter: string
  fleetcomplete_data_filter: string
  cad_data_filter: string
  unit_data_filter: string
  avl_data_sort_field: string
  fleetcomplete_data_sort_field: string
  cad_data_sort_field: string
  unit_data_sort_field: string
  avl_data_sort_ascending: boolean
  fleetcomplete_data_sort_ascending: boolean
  cad_data_sort_ascending: boolean
  unit_data_sort_ascending: boolean
  avl_data_special_filter: string
  fleetcomplete_data_special_filter: string
  cad_data_special_filter: string
  unit_data_special_filter: string
}

export interface IAction
{
  type: string
  payload: any
}

export interface IErrorInformation
{
  colspan: number
  error_information: Array<string>
  show_errors: boolean
}

export interface IAVLUnitOptions
{
  show_unit_options: boolean
  colspan: number
  unitcode: string
  device_id: string
  device_type: string
  new_unitcode: string
}