import React from 'react';
import CADData from './CADData';
import { Store } from '../Store';
import { Format_DateTime } from '../Utilities';
import ErrorInformation from '../ErrorInformation';
import UnitHistory from '../UnitHistory';
import UnitHistoryList from '../UnitHistoryList';
import { ICADDataWithIndex } from '../interfaces';

const CAD = (props:ICADDataWithIndex) =>
{
  const { state, dispatch } = React.useContext(Store);

  const fetchCADData = async () =>
  {
    const data = await CADData.Get();
    return dispatch({ type: 'get_cad_data', payload: data });
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


  return (
    <>
      <tr>
        <td>
          {props.index + 1}
        </td>
        <td>
          {props.unitcode}
          {props.latitude !== 0 ? (
            <span
              title="View this on the Map"
              style={{ color: "rgb(0,0,225)" }}
              className="icon cursor_pointer"
              onClick={event =>
              {
                viewOnMap(props.longitude, props.latitude);
              }}>
              <i className="fas fa-eye"></i>
            </span>
          ) : ''}
        </td>
        <td>
          {props.inci_id.trim().length > 0 ? 'On A Call' : ''}
        </td>
        <td>
          {props.status}
        </td>
        <td>
          {props.avstatus}
        </td>

        <td>
          {Format_DateTime(props.updated_on)}
        </td>
        <td>
          {Format_DateTime(props.location_timestamp)}
        </td>
        <td className="has-text-right icon-options">
          {props.error_information.length > 0 ? (
            <span
              title="View Errors"
              className="icon cursor_pointer has-text-warning"
              onClick={event =>
              {
                dispatch({ type: 'cad_data_toggle_show_errors', payload: props.unitcode });
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
                let deviceHistory = await UnitHistory.GetByDeviceId(props.unitcode);
                dispatch({
                  type: 'cad_device_history',
                  payload: {
                    unitcode: props.unitcode,
                    device_history: deviceHistory
                  }
                });
              }
              else
              {
                dispatch({
                  type: 'cad_device_history',
                  payload: {
                    unitcode: props.unitcode,
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
              const response = await CADData.Delete(props.unitcode);
              if (response.ok)
              {
                fetchCADData();
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
      <ErrorInformation
        colspan={8}
        error_information={props.error_information}
        show_errors={props.show_errors} />
      <UnitHistoryList
        colspan={8}
        title="History By Device Id"
        history={props.device_history}
      />
    </>
  );

}

export default CAD;