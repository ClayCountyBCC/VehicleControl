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

  //const fetchUnitData = async () =>
  //{
  //  const data = await UnitData.Get();
  //  return dispatch({ type: 'get_unit_data', payload: data });
  //}

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
          <span
            title="Change this Unit's Information"
            className="cursor_pointer has-text-link"
            onClick={event =>
            {
              let options_toggle = state.unit_view.e[props.unitcode] && state.unit_view.e[props.unitcode]['options'] ? !state.unit_view.e[props.unitcode]['options'] : true;
              dispatch(
                {
                  type: 'update_unit_view_unit',
                  payload:
                  {
                    unitcode: props.unitcode,
                    view:
                    {
                      options: options_toggle
                    }
                  }
                });
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
                dispatch({ type: 'view_avl_by_unit', payload: props.unitcode });
              }
              }>
              <i className="fas fa-edit"></i>
            </span>
          ) : ''}
        </td>
        <td>
          {props.fc_latitude !== 0 ? (
            <span
              title="View this on the Map"
              className="icon cursor_pointer"
              style={{ color: "rgb(0,225,0)" }}
              onClick={event =>
              {
                viewOnMap(props.fc_longitude, props.fc_latitude);
              }}>
              <i className="fas fa-eye"></i>
            </span>
          ) : ''}
          {new Date(props.fc_location_timestamp).getFullYear() > 1995 ? (
            <span
              style={{ marginLeft: ".5em", color: "rgb(0, 225, 0)" }}
              title="View this on the Fleet Complete Menu"
              className="icon cursor_pointer"
              onClick={event =>
              {
                dispatch({ type: 'view_fc_by_unit', payload: props.unitcode });
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
                dispatch({ type: 'view_cad_by_unit', payload: props.unitcode });
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
                let errors_toggle = state.unit_view.e[props.unitcode] && state.unit_view.e[props.unitcode]['errors'] ? !state.unit_view.e[props.unitcode]['errors'] : true;
                dispatch(
                  {
                    type: 'update_unit_view_unit',
                    payload:
                    {
                      unitcode: props.unitcode,
                      view:
                      {
                        errors: errors_toggle
                      }
                    }
                  });

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

              let history = [];
              if (!state.unit_view.e[props.unitcode]['history'] || state.unit_view.e[props.unitcode]['history'].length === 0)
              {
                history = await UnitHistory.GetByUnit(props.unitcode);
              }

              dispatch(
                {
                  type: 'update_unit_view_unit',
                  payload:
                  {
                    unitcode: props.unitcode,
                    view:
                    {
                      history: history
                    }
                  }
                });

            }}>
            <i className="fas fa-history"></i>
          </span>

          {new Date(props.avl_location_timestamp).getFullYear() === 1995 && 
            new Date(props.fc_location_timestamp).getFullYear() === 1995 && 
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
        {...props}
        />
      <ErrorInformation
        colspan={8}
        error_information={props.error_information}
        show_errors={state.unit_view.e[props.unitcode] && state.unit_view.e[props.unitcode]['errors']} />
      <UnitHistoryList
        colspan={8}
        title="History By Device Id"
        history={state.unit_view.e[props.unitcode] && state.unit_view.e[props.unitcode]['history']}
      />
    </>
  );

}

export default Unit;