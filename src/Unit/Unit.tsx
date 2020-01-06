import React from 'react';
import UnitData from './UnitData';
import { Store } from '../Store';
//import { Format_DateTime } from '../Utilities';
import ErrorInformation from '../ErrorInformation';
//import UnitOptions from '../UnitOptions';
import UnitHistory from '../UnitHistory';
import UnitHistoryList from '../UnitHistoryList';
import UnitControls from './UnitControls';
import { IUnitDataWithIndex, IUnitControls } from '../interfaces';


const Unit = (props: IUnitDataWithIndex) =>
{
  const { dispatch } = React.useContext(Store);

  //const updateUnitData = async (asset_tag: string, current_unit: string) =>
  //{
  //  const response = await UnitData.Update(asset_tag, current_unit);
  //  if (response.ok)
  //  {
  //    fetchFCData();
  //  }
  //  else
  //  {
  //    alert("There was a problem with deleting this record. Please contact MIS Development for more information.");
  //  }
  //}

  const fetchUnitData = async () =>
  {
    const data = await UnitData.Get();
    return dispatch({ type: 'get_unit_data', payload: data });
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
              dispatch({ type: 'unit_data_toggle_show_unit_options', payload: props.unitcode });
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
              className="icon">
              <i className="fas fa-eye"></i>
            </span>
          ): ''}
          {new Date(props.avl_location_timestamp).getFullYear() > 1995 ? (
            <span
              style={{ marginLeft: ".5em" }}
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
              className="icon">
              <i className="fas fa-eye"></i>
            </span>
          ) : ''}
          {new Date(props.fc_location_timestamp).getFullYear() > 1995 ? (
            <span
              style={{ marginLeft: ".5em" }}
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
              className="icon">
              <i className="fas fa-eye"></i>
            </span>
          ) : ''}          
          {new Date(props.cad_location_timestamp).getFullYear() > 1995 ? (
            <span
              style={{marginLeft: ".5em"}}
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
                dispatch({ type: 'unit_data_toggle_show_errors', payload: props.unitcode });
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
                let deviceHistory = await UnitHistory.GetByUnit(props.unitcode);
                dispatch({
                  type: 'unit_device_history',
                  payload: {
                    unitcode: props.unitcode,
                    device_history: deviceHistory
                  }
                });
              }
              else
              {
                dispatch({
                  type: 'unit_device_history',
                  payload: {
                    unitcode: props.unitcode,
                    device_history: []
                  }
                });
              }
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
                  fetchUnitData();
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
        refresh_data={fetchUnitData}
        {...props}
        />
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

export default Unit;