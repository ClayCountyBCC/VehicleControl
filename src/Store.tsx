import React, { useReducer } from 'react';
import { IState, IAction, IDataView, IDataElementOptions } from './interfaces';
import AVLData from './AVL/AVLData';
import FleetCompleteData from './FleetComplete/FleetCompleteData';
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
  cad_data: new Array<CADData>(),
  unit_data: new Array<UnitData>(),

  filtered_avl_data: new Array<AVLData>(),
  filtered_fc_data: new Array<FleetCompleteData>(),
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
      }

    case "set_current_view":
      return {
        ...state,
        current_view: action.payload
      }

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

    case "search_avl_data":
      let tmp_avl_search_view = {
        ...state.avl_view,
        data_filter: action.payload
      };

      return {
        ...state,
        filtered_avl_data:
          process_avl(
            state.avl_data,
            tmp_avl_search_view),
        avl_view: tmp_avl_search_view
      }

    case "search_fc_data":
      let tmp_fc_search_view = {
        ...state.fc_view,
        data_filter: action.payload
      };

      return {
        ...state,
        filtered_fc_data:
          process_fc(
            state.fc_data,
            tmp_fc_search_view),
        fc_view: tmp_fc_search_view
      }

    case "search_cad_data":
      let tmp_cad_search_view = {
        ...state.cad_view,
        data_filter: action.payload
      };

      return {
        ...state,
        filtered_cad_data:
          process_cad(
            state.cad_data,
            tmp_cad_search_view),
        cad_view: tmp_cad_search_view
      }

    case "search_unit_data":
      let tmp_unit_search_view = {
        ...state.unit_view,
        data_filter: action.payload
      };

      return {
        ...state,
        filtered_unit_data:
          process_unit(
            state.unit_data,
            tmp_unit_search_view),
        unit_view: tmp_unit_search_view        
      };

      //return {
      //  ...state,
      //  filtered_unit_data:
      //    process_unit(
      //      state.unit_data,
      //      action.payload,
      //      state.unit_data_sort_field,
      //      state.unit_data_sort_ascending,
      //      state.unit_data_special_filter),
      //  unit_data_filter: action.payload
      //};

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

    //case "unit_device_history":
    //  let showUnitHistory = state.filtered_unit_data.map(a =>
    //  {
    //    if (a.unitcode === action.payload.unitcode)
    //    {
    //      a.device_history = action.payload.device_history;
    //    }
    //    return a;
    //  });

    //  return {
    //    ...state,
    //    filtered_unit_data: showUnitHistory
    //  };


    case "avl_data_special_filter":
      let avl_view_special = {
        ...state.avl_view,
        special_filter: action.payload
      }
      return {
        ...state,
        filtered_avl_data: process_avl(state.avl_data, avl_view_special), avl_view: avl_view_special
      };

    case "fc_data_special_filter":
      let fc_view_special = {
        ...state.fc_view,
        special_filter: action.payload
      }
      return {
        ...state,
        filtered_fc_data: process_fc(state.fc_data, fc_view_special), fc_view: fc_view_special
      };

    case "cad_data_special_filter":
      let cad_view_special = {
        ...state.cad_view,
        special_filter: action.payload
      }
      return {
        ...state,
        filtered_cad_data: process_cad(state.cad_data, cad_view_special), cad_view: cad_view_special
      };
      //return {
      //  ...state,
      //  filtered_cad_data: process_cad(state.cad_data, state.cad_data_filter, state.cad_data_sort_field, state.cad_data_sort_ascending, action.payload),
      //  cad_data_special_filter: action.payload
      //};

    case "unit_data_special_filter":
      let unit_view_special = {
        ...state.unit_view,
        special_filter: action.payload
      }
      return {
        ...state,
        filtered_unit_data: process_unit(state.unit_data, unit_view_special), unit_view: unit_view_special
      };
      //return {
      //  ...state,
      //  filtered_unit_data: process_cad(state.unit_data, state.unit_data_filter, state.unit_data_sort_field, state.unit_data_sort_ascending, action.payload),
      //  unit_data_special_filter: action.payload
      //};

    case "avl_data_sort":
      let avl_sort_view = {
        ...state.avl_view,
        sort_field: action.payload,
        sort_ascending: !state.avl_view.sort_ascending
      }
      let avl_filtered = sort(state.filtered_avl_data, avl_sort_view);
      return {
        ...state,
        filtered_avl_data: avl_filtered,
        avl_view: avl_sort_view
      };

    case "fc_data_sort":
      let fc_sort_view = {
        ...state.fc_view,
        sort_field: action.payload,
        sort_ascending: !state.fc_view.sort_ascending
      }
      let fc_filtered = sort(state.filtered_fc_data, fc_sort_view);
      return {
        ...state,
        filtered_fc_data: fc_filtered,
        fc_view: fc_sort_view
      };
      //let filterFC = sort(state.filtered_fc_data, action.payload, !state.fc_data_sort_ascending);
      //return {
      //  ...state,
      //  filtered_fc_data: filterFC,
      //  fc_data_sort_field: action.payload,
      //  fc_data_sort_ascending: !state.fc_data_sort_ascending
      //};

    case "cad_data_sort":
      let cad_sort_view = {
        ...state.cad_view,
        sort_field: action.payload,
        sort_ascending: !state.cad_view.sort_ascending
      }
      let cad_filtered = sort(state.filtered_cad_data, cad_sort_view);
      return {
        ...state,
        filtered_cad_data: cad_filtered,
        cad_view: cad_sort_view
      };


    case "unit_data_sort":
      let unit_sort_view = {
        ...state.unit_view,
        sort_field: action.payload,
        sort_ascending: !state.unit_view.sort_ascending
      }
      let unit_filtered = sort(state.filtered_unit_data, unit_sort_view);
      return {
        ...state,
        filtered_unit_data: unit_filtered,
        unit_view: unit_sort_view
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

    //case "unit_data_toggle_show_errors":
    //  let showUnitError = state.filtered_unit_data.map(a =>
    //  {
    //    if (a.unitcode === action.payload)
    //    {
    //      a.show_errors = !a.show_errors;
    //    }
    //    return a;
    //  });
    //  return {
    //    ...state,
    //    filtered_unit_data: showUnitError
    //  };

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

    case "update_avl_view_device":
      let avle = state.avl_view.e;
      let avl_unitcode = action.payload.unitcode;
      if (!avle[avl_unitcode])
      {
        avle[avl_unitcode] = NewDataElementOptions();
      }
      avle[avl_unitcode] = {
        ...avle[avl_unitcode],
        ...action.payload.view
      }
      return {
        ...state,
        avl_view: {
          ...state.avl_view,
          e: avle
        }
      }

    case "update_view":
      console.log('updating view', action.payload);
      let v = state[action.payload.view];
      v = {
        ...state[action.payload.view],
        ...action.payload.option
      }
      return {
        ...state,
        [action.payload.view]: v
      };


    case "update_unit_view":
      let uv = state.unit_view;
      uv = {
        ...state.unit_view,
        ...action.payload
      }
      return {
        ...state,
        unit_view: uv
      };

    case "update_unit_view_unit":
      let uve = state.unit_view.e;
      let unitcode = action.payload.unitcode;
      if (!uve[unitcode])
      {
        uve[unitcode] = NewDataElementOptions();
      }
      uve[unitcode] = {
        ...uve[unitcode],
        ...action.payload.view
      }
      return {
        ...state,
        unit_view: {
          ...state.unit_view,
          e: uve
        }
      }

    default:
      return state;
  }
}

function filter_data(view: string, state: IState): Array<AVLData> | Array<FleetCompleteData> | Array<UnitData> | Array<CADData>
{
  switch (view)
  {
    case 'unit_view':
      return process_unit(state.unit_data, state.unit_view);
      
    case 'cad_view':
      return process_cad(state.cad_data, state.cad_view);

    case 'avl_view':
      return process_avl(state.avl_data, state.avl_view);

    case 'fc_view':
      return process_fc(state.fc_data, state.fc_view);

    default:
      return [];      
  }
}

function filter_avl(arrayToFilter:Array<AVLData>, filterUsing:string): Array<AVLData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let split = filterUsing.toLowerCase().split(",");
  //let f = filterUsing.toLowerCase();
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
    //return j.device_id.toLowerCase().indexOf(f) > -1 ||
    //  j.unitcode.toLowerCase().indexOf(f) > -1;
  });
  return filtered;
}

function filter_fc(arrayToFilter: Array<FleetCompleteData>, filterUsing: string): Array<FleetCompleteData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let split = filterUsing.toLowerCase().split(",");
  //let f = filterUsing.toLowerCase();
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
    //return j.device_id.toLowerCase().indexOf(f) > -1 ||
    //  j.unitcode.toLowerCase().indexOf(f) > -1 || 
    //  j.asset_tag.toLowerCase().indexOf(f) > -1;
  });
  return filtered;
}

function filter_cad(arrayToFilter: Array<CADData>, filterUsing: string): Array<CADData>
{
  if (filterUsing.length === 0) return arrayToFilter;
  let split = filterUsing.toLowerCase().split(",");
  //let f = filterUsing.toLowerCase();
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
    //return j.unitcode.toLowerCase().indexOf(f) > -1;
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
    history: []
  }
}