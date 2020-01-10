﻿import UnitHistory from './UnitHistory';
import AVLData from './AVL/AVLData';
import FleetCompleteData from './FleetComplete/FleetCompleteData';
import CADData from './Cad/CADData';
import UnitData from './Unit/UnitData';
import SimpleValue from './SimpleValue';

export interface IState
{
  map: null | object;
  map_view: null | object;

  unit_groups: Array<SimpleValue>;
  current_view: string;
  avl_data: Array<AVLData>;
  fc_data: Array<FleetCompleteData>;
  cad_data: Array<CADData>;
  unit_data: Array<UnitData>;
  filtered_avl_data: Array<AVLData>;
  filtered_fc_data: Array<FleetCompleteData>;
  filtered_cad_data: Array<CADData>;
  filtered_unit_data: Array<UnitData>;
  avl_data_filter: string;
  fc_data_filter: string;
  cad_data_filter: string;
  unit_data_filter: string;
  avl_data_sort_field: string;
  fc_data_sort_field: string;
  cad_data_sort_field: string;
  unit_data_sort_field: string;
  avl_data_sort_ascending: boolean;
  fc_data_sort_ascending: boolean;
  cad_data_sort_ascending: boolean;
  unit_data_sort_ascending: boolean;
  avl_data_special_filter: string;
  fc_data_special_filter: string;
  cad_data_special_filter: string;
  unit_data_special_filter: string;
}

export interface IAVLDataWithIndex extends AVLData
{
  index: number  
}

export interface IFCDataWithIndex extends FleetCompleteData
{
  index: number
}

export interface ICADDataWithIndex extends CADData
{
  index: number
}

export interface IUnitDataWithIndex extends UnitData
{
  index: number
}

export interface IUnitControls extends IUnitDataWithIndex
{
  colspan: number
  refresh_data: Function
}

export interface IAddUnit
{
  unitcode: string
  show_add_unit: boolean
  has_avl_device: boolean
  has_fc_device: boolean
  should_have_cad_location: boolean
  group_label: string
  cancel: Function
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

export interface IUnitOptions
{
  show_unit_options: boolean
  colspan: number
  unitcode: string
  device_id: string
  device_type?: string
  asset_tag?: string
  new_unitcode: string
  update_data: Function
}

export interface IUnitHistoryList
{
  colspan: number
  title: string
  history: Array<UnitHistory>
}