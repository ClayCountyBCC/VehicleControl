import React, { useReducer } from 'react';
import { IState, IAction, IDataView, IDataElementOptions } from './interfaces';
import AVLData from './AVL/AVLData';
import FleetCompleteData from './FleetComplete/FleetCompleteData';
import GeotabData from './Geotab/GeotabData';
import CADData from './Cad/CADData';
import UnitData from './Unit/UnitData';

const initialState: IState =
{
  map: null,
  map_view: null,

  unit_groups: [],
  current_view: "unit",

  avl_view:
  {
    e: {},
    data_filter: "",
    sort_field: "device_id",
    sort_ascending: true,
    special_filter: ""
  },
  fc_view:
  {
    e: {},
    data_filter: "",
    sort_field: "device_id",
    sort_ascending: true,
    special_filter: ""
  },

  gt_view:
  {
    e: {},
    data_filter: "",
    sort_field: "device_id",
    sort_ascending: true,
    special_filter: ""
  },

  cad_view:
  {
    e: {},
    data_filter: "",
    sort_field: "unitcode",
    sort_ascending: true,
    special_filter: ""
  },
  unit_view:
  {
    e: {},
    data_filter: "",
    sort_field: "unitcode",
    sort_ascending: true,
    special_filter: ""
  },

  avl_data: new Array<AVLData>(),
  fc_data: new Array<FleetCompleteData>(),
  gt_data: new Array<GeotabData>(),
  cad_data: new Array<CADData>(),
  unit_data: new Array<UnitData>(),

  filtered_avl_data: new Array<AVLData>(),
  filtered_fc_data: new Array<FleetCompleteData>(),
  filtered_gt_data: new Array<GeotabData>(),
  filtered_cad_data: new Array<CADData>(),
  filtered_unit_data: new Array<UnitData>(),
}

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState
{
  switch (action.type)
  {

    case "save_map":
      return {
        ...state,
        map: action.payload
      }

    case "save_map_view":
      return {
        ...state,
        map_view: action.payload
      }

    case "get_unit_groups_data":
      return {
        ...state,
        unit_groups: action.payload
      };

    case "set_current_view":
      return {
        ...state,
        current_view: action.payload
      };

    case "view_avl_by_unit":
      let tmp_avl_view = {
        ...state.avl_view,
        data_filter: action.payload,
        special_filter: ''
      };

      return {
        ...state,
        current_view: 'avl',

        filtered_avl_data:
          process_avl(
            state.avl_data,
            tmp_avl_view),
        avl_view: tmp_avl_view
      }

    case "view_fc_by_unit":
      let tmp_fc_view = {
        ...state.fc_view,
        data_filter: action.payload,
        special_filter: ''
      };

      return {
        ...state,
        current_view: 'fc',
        filtered_fc_data:
          process_fc(
            state.fc_data,
            tmp_fc_view),
        fc_view: tmp_fc_view
      }

    case "view_gt_by_unit":
      let tmp_gt_view = {
        ...state.gt_view,
        data_filter: action.payload,
        special_filter: ''
      };

      return {
        ...state,
        current_view: 'gt',
        filtered_gt_data:
          process_gt(
            state.gt_data,
            tmp_gt_view),
        gt_view: tmp_gt_view
      }

    case "view_cad_by_unit":
      let tmp_cad_view = {
        ...state.cad_view,
        data_filter: action.payload,
        special_filter: ''
      };

      return {
        ...state,
        current_view: 'cad',
        filtered_cad_data:
          process_cad(
            state.cad_data, tmp_cad_view),
        cad_view: tmp_cad_view
      }

    case "get_avl_data":
      return {
        ...state,
        avl_data: action.payload,
        filtered_avl_data:
          process_avl(
            action.payload,
            state.avl_view)
      };

    case "get_fc_data":
      return {
        ...state,
        fc_data: action.payload,
        filtered_fc_data:
          process_fc(
            action.payload,
            state.fc_view)
      };

    case "get_gt_data":
      return {
        ...state,
        gt_data: action.payload,
        filtered_gt_data:
          process_gt(
            action.payload,
            state.gt_view)
      };

    case "get_cad_data":
      return {
        ...state,
        cad_data: action.payload,
        filtered_cad_data:
          process_cad(
            action.payload,
            state.cad_view)
      };

    case "get_unit_data":
      return {
        ...state,
        unit_data: action.payload,
        filtered_unit_data:
          process_unit(
            action.payload,
            state.unit_view)
      };

    case "update_view":
      let v = state[action.payload.view];
      v = {
        ...state[action.payload.view],
        ...action.payload.option
      }
      return {
        ...state,
        [action.payload.view]: v,
        ...filter_data(action.payload.view, v, state)
      };

    case "update_view_device":      
      let new_view = action.payload.view.split("_")[0];
      let ve = state[action.payload.view].e;
      let id = action.payload.unitcode ? action.payload.unitcode : action.payload.device_id;
      if (!ve[id])
      {
        ve[id] = NewDataElementOptions();
      }
      ve[id] = {
        ...ve[id],
        ...action.payload.option
      }
      return {
        ...state,
        current_view: new_view,
        [action.payload.view]: {
          ...state[action.payload.view],
          e: ve
        }
      }

    default:
      console.log('action type not found, returning current state', action.type);
      return state;
  }
}

function filter_data(view: string, new_view: IDataView, state: IState): {}
{
  switch (view)
  {
    case 'unit_view':
      return { filtered_unit_data: process_unit(state.unit_data, new_view) };
      
    case 'cad_view':
      return { filtered_cad_data: process_cad(state.cad_data, new_view) };

    case 'avl_view':
      return { filtered_avl_data: process_avl(state.avl_data, new_view) };      

    case 'fc_view':
      return { filtered_fc_data: process_fc(state.fc_data, new_view) };  

    case 'gt_view':
      return { filtered_gt_data: process_gt(state.gt_data, new_view) }; 

    default:
      return {};      
  }
}

function filter_avl(arrayToFilter:Array<AVLData>, filterUsing:string): Array<AVLData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let split = filterUsing.toLowerCase().split(",");
  let filtered = arrayToFilter.filter(j =>
  {
    let check = false;
    for (let s of split)
    {
      s = s.trim();
      check = (j.unitcode.toLowerCase().indexOf(s) > -1 || j.device_id.toLowerCase().indexOf(s) > -1);
      if (check) break;
    }
    return check;
  });
  return filtered;
}

function filter_fc(arrayToFilter: Array<FleetCompleteData>, filterUsing: string): Array<FleetCompleteData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let split = filterUsing.toLowerCase().split(",");
  let filtered = arrayToFilter.filter(j =>
  {
    let check = false;
    for (let s of split)
    {
      s = s.trim();
      check = (j.unitcode.toLowerCase().indexOf(s) > -1 || j.device_id.toLowerCase().indexOf(s) > -1 || j.asset_tag.toLowerCase().indexOf(s) > -1);
      if (check) break;
    }
    return check;
  });
  return filtered;
}

function filter_gt(arrayToFilter: Array<GeotabData>, filterUsing: string): Array<GeotabData> {
  if (filterUsing.length === 0) return arrayToFilter;
  let split = filterUsing.toLowerCase().split(",");
  let filtered = arrayToFilter.filter(j => {
    let check = false;
    for (let s of split) {
      s = s.trim();
      check = (j.unitcode.toLowerCase().indexOf(s) > -1 || j.device_id.toLowerCase().indexOf(s) > -1 || j.serial_number.toLowerCase().indexOf(s) > -1);
      if (check) break;
    }
    return check;
  });
  return filtered;
}

function filter_cad(arrayToFilter: Array<CADData>, filterUsing: string): Array<CADData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let split = filterUsing.toLowerCase().split(",");
  let filtered = arrayToFilter.filter(j =>
  {
    let check = false;
    for (let s of split)
    {
      s = s.trim();
      check = (j.unitcode.toLowerCase().indexOf(s) > -1);
      if (check) break;
    }
    return check;
  });
  return filtered;
}

function filter_unit(arrayToFilter: Array<UnitData>, filterUsing: string): Array<UnitData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let split = filterUsing.toLowerCase().split(",");
  let f = filterUsing.toLowerCase();
  let filtered = arrayToFilter.filter(j =>
  {
    let check = false;
    for (let s of split)
    {
      s = s.trim();
      check = (j.unitcode.toLowerCase().indexOf(s) > -1 || j.group_label.toLowerCase().indexOf(s) > -1 || j.using_unit.toLowerCase().indexOf(f) > -1);
      if (check) break;
    }
    return check;
  });
  return filtered;
}

function special_filter(array: Array<any>, specialFilter: string): Array<any>
{
  if (specialFilter.length === 0) return array;
  switch (specialFilter)
  {
    case "error":
      let filtered = array.filter(d => d.error_information.length > 0);
      return filtered;

    case "asset_tag":
      return array.filter(d => d.has_asset_tag_error);

    case "date":
      return array.filter(d => d.has_date_error);

    case "location":
      return array.filter(d => d.has_location_error);

    case "unit":
      return array.filter(d => d.has_unit_error);

    case "cad":
      return array.filter(d => d.has_cad_error);

    case "avl":
      return array.filter(d => d.has_avl_error);

    case "fc":
      return array.filter(d => d.has_fc_error);

    case "gt":
      return array.filter(d => d.has_gt_error);

    default:
      return array;
  }  
}

function sort(array: Array<any>, view:IDataView) : Array<any>
{
  const date_fields = ['updated_on', 'location_timestamp'];
  if (date_fields.indexOf(view.sort_field) > -1) return sort_dates(array, view.sort_field, view.sort_ascending);
  let sorted = array.sort((a, b) =>
  {
    if (a[view.sort_field] > b[view.sort_field]) return view.sort_ascending ? 1 : -1;
    if (b[view.sort_field] > a[view.sort_field]) return view.sort_ascending ? -1 : 1;
    return 0;
  });
  return sorted;
}

function sort_dates(array: Array<any>, field: string, ascending: boolean): Array<any>
{
  let sorted = array.sort((a, b) =>
  {
    if (new Date(a[field]) > new Date(b[field])) return ascending ? 1 : -1;
    if (new Date(b[field]) > new Date(a[field])) return ascending ? -1 : 1;
    return 0;
  });
  return sorted;
}

function process_avl(array: Array<any>, view: IDataView): Array<AVLData>
{
  let filtered = filter_avl(array, view.data_filter);
  let special_filtered = special_filter(filtered, view.special_filter);
  return sort(special_filtered, view);
}

function process_fc(array: Array<any>, view: IDataView): Array<FleetCompleteData>
{
  let filtered = filter_fc(array, view.data_filter);
  let special_filtered = special_filter(filtered, view.special_filter);
  return sort(special_filtered, view);
}
function process_gt(array: Array<any>, view: IDataView): Array<GeotabData> {
  let filtered = filter_gt(array, view.data_filter);
  let special_filtered = special_filter(filtered, view.special_filter);
  return sort(special_filtered, view);
}


function process_cad(array: Array<any>, view: IDataView): Array<CADData>
{
  let filtered = filter_cad(array, view.data_filter);
  let special_filtered = special_filter(filtered, view.special_filter);
  return sort(special_filtered, view);
}

function process_unit(array: Array<any>, view: IDataView): Array<UnitData>
{
  let filtered = filter_unit(array, view.data_filter);
  let special_filtered = special_filter(filtered, view.special_filter);
  return sort(special_filtered, view);
}

export function StoreProvider(props: any): JSX.Element
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return (<Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>);
}

function NewDataElementOptions(): IDataElementOptions
{
  return {
    options: false,
    errors: false,
    history: [],
    details: false
  }
}