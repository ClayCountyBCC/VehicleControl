import React from 'react';
import AVLData from './AVLData';
import { Store } from './Store';
import { Format_DateTime } from './Utilities';
import ErrorInformation from './ErrorInformation';
import AVLUnitOptions from './AVLUnitOptions';

const AVL = (props:AVLData) =>
{
  const { dispatch } = React.useContext(Store);

  return (
    <>
      <tr>
        <td>
          {props.device_id}
        </td>
        <td>
          {props.device_type}
        </td>
        <td>
          <span
            className="cursor_pointer has-text-link"
            onClick={event =>
            {
              dispatch({ type: 'avl_data_toggle_show_unit_options', payload: props.device_id });
            }
            }>
            {props.unitcode.length === 0 ? 'Add' : props.unitcode}          
            </span>
        </td>
        <td>
          {Format_DateTime(props.updated_on)}
        </td>
        <td>
          {Format_DateTime(props.location_timestamp)}
        </td>
        <td>
          {props.error_information.length > 0 ? (
            <span
              className="cursor_pointer has-text-link"
              onClick={event =>
              {
                dispatch({ type: 'avl_data_toggle_show_errors', payload: props.device_id });
              }
              }>
              Errors
            </span>
          ) : ''
          }


        </td>
      </tr>
      <AVLUnitOptions
        colspan={6}
        new_unitcode=""
        {...props} />
      <ErrorInformation
        colspan={6}
        error_information={props.error_information}
        show_errors={props.show_errors} />
    </>
  );

}

export default AVL;