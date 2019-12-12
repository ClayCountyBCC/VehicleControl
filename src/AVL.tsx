import React from 'react';
import AVLData from './AVLData';
import { Store } from './Store';
import { Format_DateTime } from './Utilities';
import ErrorInformation from './ErrorInformation';

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
          {props.unitcode}
        </td>
        <td>
          {Format_DateTime(props.updated_on)}
        </td>
        <td>
          {Format_DateTime(props.location_timestamp)}
        </td>
        <td>
          <a
            onClick={event => dispatch({ type: 'avl_data_toggle_show_errors', payload: props.device_id })}>

            {props.error_information.length > 0 ? 'Errors' : ''}
          </a>
          
        </td>
      </tr>
      <ErrorInformation
        colspan={6}
        error_information={props.error_information}
        show_errors={props.show_errors} />
    </>
  );

}

export default AVL;