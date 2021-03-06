﻿import React from 'react';
import FleetCompleteData from './FleetCompleteData';
import { Store } from '../Store';
import { Format_DateTime } from '../Utilities';
import ErrorInformation from '../ErrorInformation';
import UnitOptions from '../UnitOptions';
import UnitHistory from '../UnitHistory';
import UnitHistoryList from '../UnitHistoryList';
import { IFCDataWithIndex } from '../interfaces';
import DeviceDetails from '../DeviceDetails';

const FC = (props: IFCDataWithIndex) =>
{
  const { state, dispatch } = React.useContext(Store);

  const updateFCData = async (asset_tag: string, current_unit: string) =>
  {
    const response = await FleetCompleteData.Update(asset_tag, current_unit);
    if (response.ok)
    {
      props.fetchData();
    }
    else
    {
      alert("There was a problem with deleting this record. Please contact MIS Development for more information.");
    }
  }

  let view_name = 'fc_view';

  let view = state[view_name];

  const update_view = (option: object) => 
  {
    dispatch(
      {
        type: 'update_view_device',
        payload:
        {
          view: view_name,
          device_id: props.device_id,
          option: option
        }
      });
  }

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

  const get_property = (property: string) =>
  {
    const d = view.e[props.device_id];
    if (!d) return false;
    return d[property];
  }

  const get_history = () =>
  {
    if (view.e[props.device_id] && view.e[props.device_id].history)
    {
      return view.e[props.device_id].history;
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
            title="View device details"
            className="cursor_pointer has-text-link"
            onClick={event =>
            {
              update_view({ details: !get_property('details') });
            }}>
            {props.device_id.replace(/^0+/, '')}
          </span>
          {props.latitude !== 0 ? (
            <span
              title="View this on the Map"
              className="icon cursor_pointer"
              style={{ color: "rgb(0,225,0)" }}
              onClick={event =>
              {
                viewOnMap(props.longitude, props.latitude);
              }}>
              <i className="fas fa-eye"></i>
            </span>
          ) : ''}
        </td>
        <td>
          {props.asset_tag === props.device_id ? '' : props.asset_tag}
        </td>
        <td>
          <span
            title="Change this Device's unit"
            className="cursor_pointer has-text-link"
            onClick={event =>
            {
              update_view({ options: !get_property('options') });
            }}>
            {props.unitcode.length === 0 ? 'Add' : props.unitcode}
          </span>
        </td>
        <td>
          {Format_DateTime(props.updated_on)}
        </td>
        <td>
          {Format_DateTime(props.location_timestamp)}
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
              }
              }>
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
                history = await UnitHistory.GetByDeviceId(props.asset_tag);
              }
              else
              {
                history = [];
              }
              update_view({ history: history });
            }}>
            <i className="fas fa-history"></i>
          </span>

          <span
            title="Delete This Device"
            className="icon cursor_pointer has-text-danger"
            onClick={async event =>
            {
              event.preventDefault();
              const response = await FleetCompleteData.Delete(props.device_id);
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


        </td>
      </tr>
      <DeviceDetails
        colspan={7}
        show_details={get_property('details')}
        {...props}
      />
      <UnitOptions
        colspan={7}
        new_unitcode=""
        update_data={updateFCData}
        show_unit_options={get_property('options')}
        {...props} />

      <ErrorInformation
        colspan={7}
        error_information={props.error_information}
        show_errors={get_property('errors')} />
      <UnitHistoryList
        colspan={7}
        title="History By Device Id"
        history={get_history()}
      />
    </>
  );

}

export default FC;