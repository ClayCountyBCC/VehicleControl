import React from 'react';
import UnitData from './UnitData';
import { Store } from '../Store';
import ErrorInformation from '../ErrorInformation';
import UnitHistory from '../UnitHistory';
import UnitHistoryList from '../UnitHistoryList';
import UnitControls from './UnitControls';
import { IUnitDataWithIndex } from '../interfaces';

const Unit = (props: IUnitDataWithIndex) =>
{
  const { state, dispatch } = React.useContext(Store);

  const view_name = 'unit_view';

  const view = state[view_name];

  const viewOnMap = (longitude, latitude) =>
  {
    if (!state.map_view) return;
    let point = {
      type: "point"
      , longitude: longitude
      , latitude: latitude
    };
    state.map_view.center = point;
    if (state.map_view.zoom < 18) state.map_view.zoom = 18;
  }

  const update_view = (option: object) => 
  {
    dispatch(
      {
        type: 'update_view_device',
        payload:
        {
          view: view_name,
          unitcode: props.unitcode,
          option: option
        }
      });
  }

  const update_app_view = (view_name: string, option: object) => 
  {
    dispatch(
      {
        type: 'update_view',
        payload:
        {
          view: view_name,
          option: option
        }
      });
  }

  const update_other_view = (view_name: string, unitcode: string, device_id: string, option: object) => 
  {
    dispatch(
      {
        type: 'update_view_device',
        payload:
        {
          view: view_name,
          unitcode: unitcode,
          device_id: device_id,
          option: option
        }
      });
  }

  const get_property = (property: string) =>
  {
    const d = view.e[props.unitcode];
    if (!d) return false;
    return d[property];
  }

  const get_history = () =>
  {
    const d = view.e[props.unitcode];
    if (d && d.history)
    {
      return d.history;
    }
    else
    {
      return [];
    }
  }

  return (
    <>
      <tr>
        <td>
          {props.index + 1}
        </td>
        <td>
          <span
            title="Change this Unit's Information"
            className="cursor_pointer has-text-link"
            onClick={event =>
            {
              update_view({ options: !get_property('options') });
            }}>
            {props.unitcode}
          </span>
          
        </td>
        <td>
          {props.using_unit}
        </td>
        <td>
          {props.group_label}
        </td>
        <td>
          {props.avl_latitude !== 0 ? (
            <span
              title="View this on the Map"
              style={{ color: "rgb(225,0,0)" }}
              className="icon cursor_pointer"
              onClick={event =>
              {
                viewOnMap(props.avl_longitude, props.avl_latitude);
              }}>
              <i className="fas fa-eye"></i>
            </span>
          ): ''}
          {new Date(props.avl_location_timestamp).getFullYear() > 1995 ? (
            <span
              style={{ marginLeft: ".5em", color: "rgb(225, 0, 0)" }}
              title="View this on the AVL Menu"
              className="icon cursor_pointer"
              onClick={event =>
              {
                update_app_view('avl_view', { data_filter: props.avl_device_id, special_filter: '' });
                update_other_view('avl_view', props.avl_device_id, undefined, { details: true });
              }
              }>
              <i className="fas fa-edit"></i>
            </span>
          ) : ''}
        </td>
        <td>
          {props.gt_latitude !== 0 ? (
            <span
              title="View this on the Map"
              className="icon cursor_pointer"
              style={{ color: "rgb(0,225,0)" }}
              onClick={event =>
              {
                viewOnMap(props.gt_longitude, props.gt_latitude);
              }}>
              <i className="fas fa-eye"></i>
            </span>
          ) : ''}
          {new Date(props.gt_location_timestamp).getFullYear() > 1995 ? (
            <span
              style={{ marginLeft: ".5em", color: "rgb(0, 225, 0)" }}
              title="View this on the Geotab Menu"
              className="icon cursor_pointer"
              onClick={event =>
              {
                update_app_view('gt_view', { data_filter: props.gt_device_id, special_filter: '' });
                update_other_view('gt_view', props.gt_device_id, undefined, { details: true });
              }
              }>
              <i className="fas fa-edit"></i>
            </span>
          ) : ''}
        </td>
        <td>
          {props.cad_latitude !== 0 ? (
            <span
              title="View this on the Map"
              style={{ color: "rgb(0,0,225)" }}
              className="icon cursor_pointer"
              onClick={event =>
              {
                viewOnMap(props.cad_longitude, props.cad_latitude);
              }}>
              <i className="fas fa-eye"></i>
            </span>
          ) : ''}          
          {new Date(props.cad_location_timestamp).getFullYear() > 1995 ? (
            <span
              style={{ marginLeft: ".5em", color: "rgb(0,0,225)"}}
              title="View this on the CAD Menu"
              className="icon cursor_pointer"
              onClick={event =>
              {
                update_app_view('cad_view', { data_filter: props.unitcode, special_filter: '' });
                update_other_view('cad_view', undefined, props.unitcode, { details: true });
              }
              }>
              <i className="fas fa-edit"></i>
            </span>
            ) : ''}
        </td>
        <td
          className="has-text-right icon-options">
          {
            // show errors, history, delete
          }
          {props.error_information.length > 0 ? (
            <span
              title="View Errors"
              className="icon cursor_pointer has-text-warning"
              onClick={event =>
              {
                update_view({ errors: !get_property('errors') });
              }}>
              <i className="fas fa-exclamation-circle"></i>
            </span>
          ) : ''}

          <span
            title="View History"
            className="icon cursor_pointer has-text-link"
            onClick={async event =>
            {
              event.preventDefault();

              let history = get_history();
              if (history.length === 0)
              {
                history = await UnitHistory.GetByUnit(props.unitcode);
              }
              else
              {
                history = [];
              }
              update_view({ history: history });

            }}>
            <i className="fas fa-history"></i>
          </span>

          {new Date(props.avl_location_timestamp).getFullYear() === 1995 && 
            new Date(props.gt_location_timestamp).getFullYear() === 1995 && 
            new Date(props.cad_location_timestamp).getFullYear() === 1995? (
            <span
              style={{ marginLeft: ".5em" }}
              title="Delete This Device"
              className="icon cursor_pointer has-text-danger"
              onClick={async event =>
              {
                event.preventDefault();
                const response = await UnitData.Delete(props.unitcode);
                if (response.ok)
                {
                  props.fetchData();
                }
                else
                {
                  alert("There was a problem with deleting this record. Please contact MIS Development for more information.");
                }
              }
              }>
              <i className="fas fa-trash-alt"></i>
            </span>
          ) : ''}


        </td>
      </tr>
      <UnitControls 
        colspan={8}
        refresh_data={props.fetchData}
        show_unit_options={get_property('options')}
        {...props}
        />
      <ErrorInformation
        colspan={8}
        error_information={props.error_information}
        show_errors={get_property('errors')} />
      <UnitHistoryList
        colspan={8}
        title="History By Device Id"
        history={get_history()}
      />
    </>
  );

}

export default Unit;