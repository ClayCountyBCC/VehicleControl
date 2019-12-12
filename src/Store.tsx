import React, { useContext, useReducer } from 'react';
import { IState, IAction } from './interfaces';
import AVLData from './AVLData';



const initialState: IState =
{
  avl_data: [],
  fleetcomplete_data: [],
  cad_data: [],
  unit_data: [],

  filtered_avl_data: [],
  filtered_fleetcomplete_data: [],
  filtered_cad_data: [],
  filtered_unit_data: [],

  avl_data_filter: "",
  fleetcomplete_data_filter: "",
  cad_data_filter: "",
  unit_data_filter: "",

  avl_data_sort_field: "device_id",
  fleetcomplete_data_sort_field: "",
  cad_data_sort_field: "",
  unit_data_sort_field: "",

  avl_data_sort_ascending: true,
  fleetcomplete_data_sort_ascending: true,
  cad_data_sort_ascending: true,
  unit_data_sort_ascending: true,

  avl_data_special_filter: "",
  fleetcomplete_data_special_filter: "",
  cad_data_special_filter: "",
  unit_data_special_filter: ""
}

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState
{
  switch (action.type)
  {
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

    case "avl_data_special_filter":
      return {
        ...state,
        filtered_avl_data: process_avl(state.avl_data, state.avl_data_filter, state.avl_data_sort_field, state.avl_data_sort_ascending, action.payload),
        avl_data_special_filter: action.payload
      };

    case "avl_data_sort":
      let filtered = sort(state.filtered_avl_data, action.payload, !state.avl_data_sort_ascending);
      return {
        ...state,
        filtered_avl_data: filtered,
        avl_data_sort_field: action.payload,
        avl_data_sort_ascending: !state.avl_data_sort_ascending
      };

    case "avl_data_toggle_show_errors":
      let showError = state.filtered_avl_data.map(a =>
      {
        if (a.device_id === action.payload)
        {
          a.show_errors = !a.show_errors;
        }
        return a;
      })
      return {
        ...state,
        filtered_avl_data: showError
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

function special_filter(array: Array<any>, specialFilter: string): Array<any>
{
  if (specialFilter.length === 0) return array;
  switch (specialFilter)
  {
    case "error":
      let filtered = array.filter(d => d.error_information.length > 0);
      return filtered;

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

export function StoreProvider(props: any): JSX.Element
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return (<Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>);
}