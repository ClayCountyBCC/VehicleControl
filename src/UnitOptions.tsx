import React, { useState } from 'react';
import { IUnitOptions } from './interfaces';
//import AVLData from './AVLData';
//import { Store } from './Store';

const UnitOptions = (props: IUnitOptions) =>
{
  const [currentUnit, setCurrentUnit] = useState("");

  if (!props.show_unit_options) return null;

  return (
    <tr>
      <td>
      </td>
      <td colSpan={2}
        className="has-text-right">
        Current Unit:
      </td>
      <td>
        {props.unitcode.length === 0 ? 'None' : props.unitcode}
      </td>
      <td className="has-text-right">
        Change To:
      </td>
      <td colSpan={2}>
        <div className="field has-addons">
          <div className="control">
            <input
              className="input is-small"
              type="text"
              onChange={event => setCurrentUnit(event.target.value)}
              value={currentUnit}
              placeholder="New Unit" />
          </div>
          <div className="control">
            <button
              type="button"
              onClick={async event =>
              {
                event.preventDefault();
                console.log('props serial_number', props.serial_number);
                if (props.serial_number)
                {
                  props.update_data(props.serial_number, currentUnit.trim());
                }
                else
                {
                  props.update_data(props.device_id, props.device_type, currentUnit.trim());
                }
              }}
              className="button is-success is-small">
              Save
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default UnitOptions;