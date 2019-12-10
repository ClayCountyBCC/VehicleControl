import React from 'react';
import AVLData from './AVLData';
import { Format_DateTime } from './Utilities';

const AVL = (props:AVLData) =>
{

  return (
    <tr>
      <td>
        { props.device_id }
      </td>
      <td>
        { props.device_type }
      </td>
      <td>
        {props.unitcode}
      </td>
      <td>
        { Format_DateTime(props.updated_on)}
      </td>
      <td>
        {props.error_information.length > 0 ? 'Errors' : ''}
      </td>
    </tr>
  );

}

export default AVL;