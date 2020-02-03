import React from 'react';
import CADData from './CADData';
import { Store } from '../Store';
import { Format_DateTime } from '../Utilities';
import ErrorInformation from '../ErrorInformation';
import UnitHistory from '../UnitHistory';
import UnitHistoryList from '../UnitHistoryList';
import { ICADDataWithIndex } from '../interfaces';
import DeviceDetails from '../DeviceDetails';

const CAD = (props:ICADDataWithIndex) =>
{
  const { state, dispatch } = React.useContext(Store);

  let view_name = 'cad_view';

  let view = state[view_name];

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
    const d = view.e[props.unitcode];
    if (!d) return false;
    return d[property];
  }

  const get_history = () =>
  {
    if (view.e[props.unitcode] && view.e[props.unitcode].history)
    {
      return view.e[props.unitcode].history;
    }
    else
    {
      return [];
    }
  }

  return (
    <>
      <tr id={'cad' + props.unitcode}>
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
            {props.unitcode}
          </span>
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
                history = await UnitHistory.GetByDeviceId(props.unitcode);
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
              const response = await CADData.Delete(props.unitcode);
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
        colspan={8}
        show_details={get_property('details')}
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

export default CAD;