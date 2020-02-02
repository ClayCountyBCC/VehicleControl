import React from 'react';
import FleetCompleteData from './FleetCompleteData';
import { Store } from '../Store';
import { Format_DateTime } from '../Utilities';
import ErrorInformation from '../ErrorInformation';
import UnitOptions from '../UnitOptions';
import UnitHistory from '../UnitHistory';
import UnitHistoryList from '../UnitHistoryList';
import { IFCDataWithIndex } from '../interfaces';

const FC = (props: IFCDataWithIndex) =>
{
  const { state, dispatch } = React.useContext(Store);

  const updateFCData = async (asset_tag: string, current_unit: string) =>
  {
    const response = await FleetCompleteData.Update(asset_tag, current_unit);
    if (response.ok)
    {
      fetchFCData();
    }
    else
    {
      alert("There was a problem with deleting this record. Please contact MIS Development for more information.");
    }
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

  const fetchFCData = async () =>
  {
    const data = await FleetCompleteData.Get();
    return dispatch({ type: 'get_fc_data', payload: data });
  }


  return (
    <>
      <tr id={'fc' + props.device_id}>
        <td>
          {props.index + 1}
        </td>
        <td>
          {props.device_id.replace(/^0+/, '')}
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
              dispatch({ type: 'fc_data_toggle_show_unit_options', payload: props.device_id });
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
                dispatch({ type: 'fc_data_toggle_show_errors', payload: props.device_id });
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

              if (!props.device_history || props.device_history.length === 0)
              {
                let deviceHistory = await UnitHistory.GetByDeviceId(props.asset_tag);
                dispatch({
                  type: 'fc_device_history',
                  payload: {
                    device_id: props.device_id,
                    device_history: deviceHistory
                  }
                });
              }
              else
              {
                dispatch({
                  type: 'fc_device_history',
                  payload: {
                    device_id: props.device_id,
                    device_history: []
                  }
                });
              }
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
                fetchFCData();
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

      <UnitOptions
        colspan={7}
        new_unitcode=""
        update_data={updateFCData}
        {...props} />

      <ErrorInformation
        colspan={7}
        error_information={props.error_information}
        show_errors={props.show_errors} />
      <UnitHistoryList
        colspan={7}
        title="History By Device Id"
        history={props.device_history}
      />
    </>
  );

}

export default FC;