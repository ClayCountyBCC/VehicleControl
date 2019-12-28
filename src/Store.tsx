import React, { useReducer } from 'react';
import { IState, IAction } from './interfaces';
import AVLData from './AVL/AVLData';
import FleetCompleteData from './FleetComplete/FleetCompleteData';



const initialState: IState =
{
  current_view: "avl",

  avl_data: [],
  fc_data: [],
  cad_data: [],
  unit_data: [],

  filtered_avl_data: [],
  filtered_fc_data: [],
  filtered_cad_data: [],
  filtered_unit_data: [],

  avl_data_filter: "",
  fc_data_filter: "",
  cad_data_filter: "",
  unit_data_filter: "",

  avl_data_sort_field: "device_id",
  fc_data_sort_field: "",
  cad_data_sort_field: "",
  unit_data_sort_field: "",

  avl_data_sort_ascending: true,
  fc_data_sort_ascending: true,
  cad_data_sort_ascending: true,
  unit_data_sort_ascending: true,

  avl_data_special_filter: "",
  fc_data_special_filter: "",
  cad_data_special_filter: "",
  unit_data_special_filter: ""
}

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState
{
  switch (action.type)
  {
    case "set_current_view":
      return {
        ...state,
        current_view: action.payload
      }

    case "get_avl_data":
      return {
        ...state,
        avl_data: action.payload,
        filtered_avl_data:
          process_avl(
            action.payload,
            state.avl_data_filter,
            state.avl_data_sort_field,
            state.avl_data_sort_ascending,
            state.avl_data_special_filter)
      };

    case "get_fc_data":
      return {
        ...state,
        fc_data: action.payload,
        filtered_fc_data:
          process_fc(
            action.payload,
            state.fc_data_filter,
            state.fc_data_sort_field,
            state.fc_data_sort_ascending,
            state.fc_data_special_filter)
      };

    case "get_cad_data":
      return {
        ...state,
        cad_data: action.payload,
        filtered_cad_data:
          process_fc(
            action.payload,
            state.cad_data_filter,
            state.cad_data_sort_field,
            state.cad_data_sort_ascending,
            state.cad_data_special_filter)
      };

    case "search_avl_data":
      return {
        ...state,
        filtered_avl_data:
          process_avl(
            state.avl_data,
            action.payload,
            state.avl_data_sort_field,
            state.avl_data_sort_ascending,
            state.avl_data_special_filter),
        avl_data_filter: action.payload
      };

    case "search_fc_data":
      return {
        ...state,
        filtered_fc_data:
          process_fc(
            state.fc_data,
            action.payload,
            state.fc_data_sort_field,
            state.fc_data_sort_ascending,
            state.fc_data_special_filter),
        fc_data_filter: action.payload
      };

    case "search_cad_data":
      return {
        ...state,
        filtered_cad_data:
          process_cad(
            state.cad_data,
            action.payload,
            state.cad_data_sort_field,
            state.cad_data_sort_ascending,
            state.cad_data_special_filter),
        cad_data_filter: action.payload
      };

    case "avl_device_history":
      let showAVLHistory = state.filtered_avl_data.map(a =>
      {
        if (a.device_id === action.payload.device_id)
        {
          a.device_history = action.payload.device_history;
        }
        return a;
      });

      return {
        ...state,
        filtered_avl_data: showAVLHistory
      };

    case "fc_device_history":
      let showFCHistory = state.filtered_fc_data.map(a =>
      {
        if (a.device_id === action.payload.device_id)
        {
          a.device_history = action.payload.device_history;
        }
        return a;
      });

      return {
        ...state,
        filtered_fc_data: showFCHistory
      };

    case "cad_device_history":
      let showCADHistory = state.filtered_cad_data.map(a =>
      {
        if (a.unitcode === action.payload.unitcode)
        {
          a.device_history = action.payload.device_history;
        }
        return a;
      });

      return {
        ...state,
        filtered_cad_data: showCADHistory
      };


    case "avl_data_special_filter":
      return {
        ...state,
        filtered_avl_data: process_avl(state.avl_data, state.avl_data_filter, state.avl_data_sort_field, state.avl_data_sort_ascending, action.payload),
        avl_data_special_filter: action.payload
      };

    case "fc_data_special_filter":
      return {
        ...state,
        filtered_fc_data: process_fc(state.fc_data, state.fc_data_filter, state.fc_data_sort_field, state.fc_data_sort_ascending, action.payload),
        fc_data_special_filter: action.payload
      };

    case "cad_data_special_filter":
      return {
        ...state,
        filtered_cad_data: process_cad(state.cad_data, state.cad_data_filter, state.cad_data_sort_field, state.cad_data_sort_ascending, action.payload),
        cad_data_special_filter: action.payload
      };

    case "avl_data_sort":
      let filtered = sort(state.filtered_avl_data, action.payload, !state.avl_data_sort_ascending);
      return {
        ...state,
        filtered_avl_data: filtered,
        avl_data_sort_field: action.payload,
        avl_data_sort_ascending: !state.avl_data_sort_ascending
      };

    case "fc_data_sort":
      let filterFC = sort(state.filtered_fc_data, action.payload, !state.fc_data_sort_ascending);
      return {
        ...state,
        filtered_fc_data: filterFC,
        fc_data_sort_field: action.payload,
        fc_data_sort_ascending: !state.fc_data_sort_ascending
      };

    case "cad_data_sort":
      let filterCAD = sort(state.filtered_cad_data, action.payload, !state.cad_data_sort_ascending);
      return {
        ...state,
        filtered_cad_data: filterCAD,
        cad_data_sort_field: action.payload,
        cad_data_sort_ascending: !state.cad_data_sort_ascending
      };

    case "avl_data_toggle_show_errors":
      let showAVLError = state.filtered_avl_data.map(a =>
      {
        if (a.device_id === action.payload)
        {
          a.show_errors = !a.show_errors;
        }
        return a;
      });
      return {
        ...state,
        filtered_avl_data: showAVLError
      };

    case "fc_data_toggle_show_errors":
      let showFCError = state.filtered_fc_data.map(a =>
      {
        if (a.device_id === action.payload)
        {
          a.show_errors = !a.show_errors;
        }
        return a;
      });
      return {
        ...state,
        filtered_fc_data: showFCError
      };

    case "cad_data_toggle_show_errors":
      let showCADError = state.filtered_cad_data.map(a =>
      {
        if (a.unitcode === action.payload)
        {
          a.show_errors = !a.show_errors;
        }
        return a;
      });
      return {
        ...state,
        filtered_cad_data: showCADError
      };

    case "avl_data_toggle_show_unit_options":
      let showAVLUO = state.filtered_avl_data.map(a =>
      {
        if (a.device_id === action.payload)
        {
          a.show_unit_options = !a.show_unit_options;
        }
        return a;
      });

      return {
        ...state,
        filtered_avl_data: showAVLUO
      };

    case "fc_data_toggle_show_unit_options":
      let showFCUO = state.filtered_fc_data.map(a =>
      {
        if (a.device_id === action.payload)
        {
          a.show_unit_options = !a.show_unit_options;
        }
        return a;
      });

      return {
        ...state,
        filtered_fc_data: showFCUO
      };

    default:
      return state;
  }
}

function filter_avl(arrayToFilter:Array<AVLData>, filterUsing:string): Array<AVLData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let f = filterUsing.toLowerCase();
  let filtered = arrayToFilter.filter(j =>
  {
    return j.device_id.toLowerCase().indexOf(f) > -1 ||
      j.unitcode.toLowerCase().indexOf(f) > -1;
  });
  return filtered;
}

function filter_fc(arrayToFilter: Array<FleetCompleteData>, filterUsing: string): Array<FleetCompleteData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let f = filterUsing.toLowerCase();
  let filtered = arrayToFilter.filter(j =>
  {
    return j.device_id.toLowerCase().indexOf(f) > -1 ||
      j.unitcode.toLowerCase().indexOf(f) > -1 || 
      j.asset_tag.toLowerCase().indexOf(f) > -1;
  });
  return filtered;
}

function filter_cad(arrayToFilter: Array<FleetCompleteData>, filterUsing: string): Array<FleetCompleteData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let f = filterUsing.toLowerCase();
  let filtered = arrayToFilter.filter(j =>
  {
    return j.unitcode.toLowerCase().indexOf(f) > -1;
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

    default:
      return array;
  }  
}

function sort(array: Array<any>, field: string, ascending: boolean) : Array<any>
{
  const date_fields = ['updated_on', 'location_timestamp'];
  if (date_fields.indexOf(field) > -1) return sort_dates(array, field, ascending);
  let sorted = array.sort((a, b) =>
  {
    if (a[field] > b[field]) return ascending ? 1 : -1;
    if (b[field] > a[field]) return ascending ? -1 : 1;
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

function process_avl(array: Array<any>, filter: string, field: string, ascending: boolean, specialFilter: string)
{
  let filtered = filter_avl(array, filter);
  let special_filtered = special_filter(filtered, specialFilter);
  return sort(special_filtered, field, ascending);
}

function process_fc(array: Array<any>, filter: string, field: string, ascending: boolean, specialFilter: string)
{
  let filtered = filter_fc(array, filter);
  let special_filtered = special_filter(filtered, specialFilter);
  return sort(special_filtered, field, ascending);
}

function process_cad(array: Array<any>, filter: string, field: string, ascending: boolean, specialFilter: string)
{
  let filtered = filter_cad(array, filter);
  let special_filtered = special_filter(filtered, specialFilter);
  return sort(special_filtered, field, ascending);
}

export function StoreProvider(props: any): JSX.Element
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return (<Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>);
}

